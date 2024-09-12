import nookies from 'nookies'

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'

/** COOKIE TIME */
const ONE_SECOND = 1
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_YEAR = ONE_DAY * 365

export const tokenSVC = {
  save(access_token, ctx = null) {
    nookies.set(ctx, ACCESS_TOKEN_KEY, access_token, {
      maxAge: ONE_YEAR,
      path: '/',
    })

    {
      /**
       * globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, access_token)
       * globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, access_token)
       */
    }
  },

  get(ctx = null) {
    const cookies = nookies.get(ctx)
    return cookies[ACCESS_TOKEN_KEY] || ''

    {
      /**
       * return globalThis?.localStorage?.getItem(ACCESS_TOKEN_KEY)
       * return globalThis?.sessionStorage?.getItem(ACCESS_TOKEN_KEY)
       */
    }
  },

  delete(ctx = null) {
    nookies.destroy(ctx, ACCESS_TOKEN_KEY)

    {
      /**
       * return globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)
       * return globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY)
       */
    }
  },
}
