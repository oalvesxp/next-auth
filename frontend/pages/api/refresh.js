import nookies from 'nookies'
import { HttpClient } from '../../src/infra/HttpClient/HttpClient'
import { tokenSVC } from '../../src/services/auth/tokenSVC'

const NEXT_REFRESH_TOKEN = 'REFRESH_TOKEN_NAME'

const controllers = {
  async saveRefreshToken(req, res) {
    const ctx = { req, res }

    console.log('handler', req.body)

    nookies.set(ctx, NEXT_REFRESH_TOKEN, req.body.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
    })

    res.json({
      data: {
        message: 'Stored with success!',
      },
    })
  },

  async displayCookies(req, res) {
    const ctx = { req, res }

    res.json({
      data: {
        cookies: nookies.get(ctx),
      },
    })
  },

  async regenTokens(req, res) {
    const ctx = { req, res }
    const cookies = nookies.get(ctx)
    const refresh_token = cookies[NEXT_REFRESH_TOKEN]

    const resHTTP = await HttpClient(
      `${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
      {
        method: 'POST',
        body: {
          refresh_token,
        },
      }
    )

    tokenSVC.save(resHTTP.body.data.access_token, ctx)

    if (resHTTP.ok) {
      nookies.set(ctx, NEXT_REFRESH_TOKEN, resHTTP.body.data.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
      })

      res.json({ resHTTP })
    } else {
      res.json({
        error: {
          status: 401,
          message: 'Não autorizado',
        },
      })
    }
  },
}

const controllerBy = {
  POST: controllers.saveRefreshToken,
  GET: controllers.regenTokens /** NUNCA deve ir para produção */,
}

export default function handler(req, res) {
  if (controllerBy[req.method]) {
    return controllerBy[req.method](req, res)
  }

  res.status(404).json({
    status: 404,
    message: 'Not Found!',
  })
}
