import { authSVC } from './authSVC'

export function withSession(fnc) {
  return async (ctx) => {
    try {
      const session = await authSVC.getSession(ctx)
      const customCTX = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      }

      return fnc(customCTX)
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: '/?error=401',
        },
      }
    }
  }
}
