import { db } from '../../db'
import { Auth } from '../../src/services/Auth'
import { getTokenFromHeaders } from '../../src/utils/getTokenFromHeaders'

const sessionController = {
  async getSession(req, res) {
    const token = getTokenFromHeaders(req)

    if (!token)
      return res
        .status(401)
        .json({ error: { status: 401, message: "You don't have credentials" } })

    try {
      await Auth.validateAccessToken(token)
      const decodedToken = await Auth.decodeToken(token)

      db.users.findOne({ _id: decodedToken.sub }, function (err, user) {
        if (err || user === null) {
          res.status(401).json({
            error: {
              status: 401,
              message: 'Invalid access token, please login again.',
            },
          })
        }

        res.status(200).json({
          data: {
            user: {
              username: user.username,
              email: user.email,
            },
            id: decodedToken.sub,
            roles: decodedToken.roles,
          },
        })
      })
    } catch (err) {
      res.status(401).json({
        status: 401,
        message:
          'Your access token is not valid, so you are not able to get a session.',
      })
    }
  },
}

const controllerBy = {
  GET: sessionController.getSession,
  OPTIONS: (_, res) => res.send('OK'),
}

/**
 * @swagger
 * /api/session:
 *   get:
 *     summary: Retorna a 'session' de um usuário específico
 *     parameters:
 *        - in: header
 *          name: x-authorization
 *          schema:
 *            type: string
 *            description: Você precisa fazer login para obter uma 'session'.
 *            default: access_token
 *          required: true
 *     responses:
 *       200:
 *         description: Session retornada com sucesso!
 *       401:
 *         description: Você não está autorizado a pegar a 'session'.
 */
export default function handle(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res)

  res.status(404).json({
    status: 404,
    message: 'Not Found',
  })
}
