import Container from '../src/components/Container'
import Box from '../src/components/Box'
import AuthForm from '../src/components/AuthForm'

export default function Home() {
  return (
    <>
      <Container>
        <Box>
          <h1>Seja bem-vindo!</h1>
          <p>
            <a href="/auth-ssg">Static Site Generation</a>
          </p>
          <p>
            <a href="/auth-ssr">Server Side Render</a>
          </p>
          <AuthForm />
        </Box>
      </Container>
    </>
  )
}
