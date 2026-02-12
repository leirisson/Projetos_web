import fastify from 'fastify'
import { routes } from '@/infra/http/routes/index'

export const app = fastify()
app.register(routes, {
    prefix: '/api/v1',
})


