import { useRouter } from 'next/router'
import Box from '../src/components/Box'
import Container from '../src/components/Container'
import { tokenSVC } from '../src/services/auth/tokenSVC'
import { useEffect } from 'react'
import { HttpClient } from '../src/infra/HttpClient/HttpClient'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        await HttpClient('/api/refresh', {
          method: 'DELETE',
        })
        tokenSVC.delete()
        router.push('/')
      } catch (err) {
        alert('Algo deu errado!')
      }
    })()
  }, [])

  return (
    <>
      <Container>
        <Box>
          <h1>Logout Page</h1>
          <p>Você já está indo embora? :/</p>
        </Box>
      </Container>
    </>
  )
}
