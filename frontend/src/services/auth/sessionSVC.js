import { authSVC } from './authSVC'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

function useSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    authSVC
      .getSession()
      .then((res) => {
        console.log('sessionSVC', res)
        setSession(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    data: { session },
    error,
    loading,
  }
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const router = useRouter()
    const session = useSession()

    if (!session.loading && session.error) {
      console.log('sessionSVC:', 'Redirect para Home')
      router.push('/?error=401')
    }

    const customProps = {
      ...props,
      session: session.data.session,
    }

    return <Component {...customProps} />
  }
}
