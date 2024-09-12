import nookies from 'nookies'

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
}

const controllerBy = {
  POST: controllers.saveRefreshToken,
  GET: controllers.displayCookies /** NUNCA deve ir para produção */,
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
