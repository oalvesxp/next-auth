import { db } from '../../db'
import { Auth } from '../../src/services/Auth'

const controllers = {
  async refreshTokens(req, res) {
    const { refresh_token } = req.body

    try {
      const { sub } = await Auth.validateRefreshToken(refresh_token)

      db.users.findOne({ _id: sub, refresh_token }, async function (err, user) {
        if (err)
          return res
            .status(500)
            .json({ error: { status: 500, message: 'Internal server error' } })

        if (!user?._id) {
          return res.status(401).json({
            error: {
              status: 401,
              message: 'Invalid refresh token, please login again.',
            },
          })
        }

        const tokens = {
          access_token: await Auth.generateAccessToken(sub),
          refresh_token: await Auth.generateRefreshToken(sub),
        }

        db.users.update(
          { _id: sub },
          { $set: { refresh_token: tokens.refresh_token } },
          function (err) {
            if (err) throw new Error('Not avaiable to set refresh token')

            return res.status(200).json({
              data: tokens,
            })
          }
        )
      })
    } catch (err) {
      return res.status(401).json({
        error: {
          status: 401,
          message: 'Invalid refresh token, please login again.',
        },
      })
    }
  },
}

const controllerBy = {
  POST: controllers.refreshTokens,
}

/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: Atualiza o token do usuário
 *     requestBody:
 *        content:
 *          application/json:
 *             schema:
 *                properties:
 *                   refresh_token:
 *                      type: string
 *                      default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjYwNjYzMzksImV4cCI6MTcyNjY3MTEzOSwic3ViIjoiU05ZOGUyVDgwaUFpNjg3cyJ9.FJdseH0du8VOaQElIJJEwHdSayFzFWN9ZTFqxto6uMk
 *                      description: Você precisa fazer login para atulizar o token
 *     responses:
 *       200:
 *         description: Seu refresh_token é válido, você pode atualizar.
 *       401:
 *         description: Você não está autorizado, refresh_token inválido.
 */
export default function handle(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res)

  res.status(404).json({
    status: 404,
    message: 'Not Found',
  })
}
