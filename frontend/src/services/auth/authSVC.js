import { HttpClient } from '../../infra/HttpClient/HttpClient'
import { tokenSVC } from './tokenSVC'

export const authSVC = {
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
      tokenSVC.save(body.data.access_token)
    })
  },

  async getSession(ctx) {
    const token = tokenSVC.get(ctx)

    return HttpClient(`${process.env.NEXT_PUBLIC_API_URL}/api/session`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Não autorizado')
      }
      return res.body.data
    })
  },
}
