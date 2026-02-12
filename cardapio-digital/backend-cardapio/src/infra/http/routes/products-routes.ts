import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'


export function productsRoutes(app: FastifyInstance) {
    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        return {
            message: 'Hello World!',
        }
    })
}
