import fastify from 'fastify'
import { routes } from '@/infra/http/routes/index'
import multipart from '@fastify/multipart'
import '@fastify/multipart'
import { UploadImageError } from './errors/upload-image-error'
import { CreateProductError } from './errors/create-product-error'
import { env } from './env'

export const app = fastify()

const LIMIT_SIZE_IMAGE = 2 * 1024 * 1024 // 2MB
app.register(multipart, {
  limits: {
    fileSize: LIMIT_SIZE_IMAGE // 2MB
  },
  attachFieldsToBody: true
})


app.register(routes, {
    prefix: '/api/v1',
})


app.setErrorHandler((error,_, reply) => {
    if (error instanceof UploadImageError) {
        return reply
        .status(400)
        .send({ message: error.message })
    }
    if (error instanceof CreateProductError) {
        return reply
        .status(400)
        .send({ message: error.message })
    }

    if(env.NODE_ENV !== 'production'){
        console.error('❌ Error:', error)
    }
    else{
      // enviar o log para uma ferramenta de monitoramento
      // exemplo: Sentry, datadog, newRelic
    }

    return reply
    .status(500)
    .send({ message: 'Internal server error' })
})

