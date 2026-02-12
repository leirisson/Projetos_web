import fastify from 'fastify'
import { routes } from '@/infra/http/routes/index'
import multipart from '@fastify/multipart'
import '@fastify/multipart'

export const app = fastify()

const LIMIT_SIZE_IMAGE = 2 * 1024 * 1024 // 2MB
app.register(multipart, {
  limits: {
    fileSize: LIMIT_SIZE_IMAGE // 2MB
  }
})


app.register(routes, {
    prefix: '/api/v1',
})


