import { HttpClient } from '../../infra/HttpClient/HttpClient'
import { token } from './token'

export const auth = {
  async login({ username, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error('Usuário e/ou senha inválidos!')
      }

      const body = res.body
      token.save(body.data.access_token)
    })
  },
}
