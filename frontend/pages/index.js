import Container from '../src/components/Container'
import Box from '../src/components/Box'
import AuthForm from '../src/components/AuthForm'

export default function Home() {
  return (
    <>
      <Container>
        <Box>
          <h1>Seja bem-vindo!</h1>
          <AuthForm />
        </Box>
      </Container>
    </>
  )
}
