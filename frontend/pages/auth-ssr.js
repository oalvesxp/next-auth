import Box from '../src/components/Box'
import Container from '../src/components/Container'
import Button from '../src/components/Button'
import { useRouter } from 'next/router'
import { token } from '../src/services/auth/token'

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
            router.push('/')
          }}
        >
          Voltar
        </Button>
        {/** Debug */}
        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
      </Box>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  const cookies = token.get(ctx)
  console.log('cookies', cookies)

  return {
    props: {
      token: token.get(ctx),
    },
  }
}
