import Box from '../src/components/Box'
import Container from '../src/components/Container'
import Button from '../src/components/Button'
import { useRouter } from 'next/router'
import { withSession } from '../src/services/auth/sessionSVC'

export default function AuthPageSSR(props) {
  const router = useRouter()

  return (
    <Container>
      <Box>
        <h1>Autenticado!</h1>
        <p>Server Side Render</p>

        <Button
          type="button"
          onClick={(event) => {
            router.push('/logout')
          }}
        >
          Logout
        </Button>

        {/** Debug */}
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </Box>
    </Container>
  )
}

/** Decorator Pattern */
export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  }
})
