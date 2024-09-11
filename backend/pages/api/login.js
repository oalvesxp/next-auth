import { db } from '../../db'
import { Auth } from '../../src/services/Auth'

const controllers = {
  async login(req, res) {
    const { username, password } = req.body

    db.users.findOne({ username, password }, async function (err, user) {
      if (err)
        res
          .status(500)
          .json({ error: { status: 500, message: 'Internal Server Error' } })
      if (!user)
        res.status(401).json({
          error: { status: 401, message: 'Username or password are invalid' },
        })

      const access_token = await Auth.generateAccessToken(user._id)
      const refresh_token = await Auth.generateRefreshToken(user._id)

      db.users.update(
        { _id: user._id },
        { $set: { refresh_token: refresh_token } },
        function (err) {
          if (err)
            res.status(500).json({
              error: { status: 500, message: 'Internal Server Error' },
            })

          res.status(200).json({
            data: {
              access_token,
              refresh_token,
            },
          })
        }
      )
    })
  },
}

const controllerBy = {
  POST: controllers.login,
  OPTIONS: (_, res) => res.send('OK'),
}

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Retorna access_token e refresh_token
 *     requestBody:
 *        content:
 *          application/json:
 *             schema:
 *                properties:
 *                   username:
 *                      type: string
 *                      default: oalvesxp
 *                   password:
 *                      type: string
 *                      default: safepassword
 *     responses:
 *       200:
 *         description: Sucesso, você está habilitado para login
 *       401:
 *         description: Você não está autorizado, usuário e/ou senha inválidos
 */
export default function handle(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res)

  res.status(404).json({
    status: 404,
    message: 'Not Found',
  })
}
