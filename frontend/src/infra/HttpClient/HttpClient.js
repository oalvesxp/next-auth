import { tokenSVC } from '../../services/auth/tokenSVC'

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

      console.log('HttpClient: Middleware refresh_token')
      const respHTTP = await HttpClient('http://localhost:8080/api/refresh', {
        method: 'GET',
      })

      const newAccessToken = respHTTP.body.data.access_token
      const newRefreshToken = respHTTP.body.data.refresh_token

      /** Salvando o novo access_token */
      tokenSVC.save(newAccessToken)

      /** Tentar rodar o Request Anterior */
      const retryResp = await HttpClient(url, {
        ...options,
        refresh: false,
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      })

      console.log('HttpClient', retryResp)

      return retryResp
    })
}
