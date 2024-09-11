import { createSwaggerSpec } from 'next-swagger-doc'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

const ApiDoc = ({ spec }) => {
  return <SwaggerUI spec={spec} />
}

export const getStaticProps = async (ctx) => {
  const spec = createSwaggerSpec({
    title: 'Demo API',
    version: '0.1.0',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Backend API',
        version: '1.1.0',
      },
    },
  })
  return { props: { spec } }
}

export default ApiDoc
