import nookies from 'nookies'
import { tokenSVC } from '../../services/auth/tokenSVC'
const NEXT_REFRESH_TOKEN = 'REFRESH_TOKEN_NAME'

export async function HttpClient(url, opt) {
  const options = {
    ...opt,
    headers: {
      'Content-Type': 'application/json',
      ...opt.headers,
    },
    body: opt.body ? JSON.stringify(opt.body) : null,
  }

  return fetch(url, options)
    .then(async (res) => {
      return {
        ok: res.ok,
        status: res.status,
        Message: res.statusText,
        body: await res.json(),
      }
    })
    .then(async (res) => {
      if (!opt.refresh) return res
      if (res.status != 401) return res

      const SSR = Boolean(opt?.ctx)
      const currentRefreshToken = opt?.ctx?.req?.cookies[NEXT_REFRESH_TOKEN]

      console.log('HttpClient: Middleware refresh_token')
      /** Tenta atualizar o token */

      try {
        const respHTTP = await HttpClient('http://localhost:8080/api/refresh', {
          method: SSR ? 'PUT' : 'GET',
          body: SSR ? { refresh_token: currentRefreshToken } : undefined,
        })

        const newAccessToken = respHTTP.body.data.access_token
        const newRefreshToken = respHTTP.body.data.refresh_token

        /** Salvando o novo tokens */
        if (SSR) {
          nookies.set(opt.ctx, NEXT_REFRESH_TOKEN, newRefreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
          })
        }

        tokenSVC.save(newAccessToken)

        /** Tentar rodar o Request Anterior */
        const retryResp = await HttpClient(url, {
          ...options,
          refresh: false,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        })

        return retryResp
      } catch (err) {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'Invalid refresh token, please login again.',
          },
        })
      }
    })
}
