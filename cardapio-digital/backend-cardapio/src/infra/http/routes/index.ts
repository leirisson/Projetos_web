import { FastifyInstance } from 'fastify'
import {productsRoutes} from './products-routes'


export async function routes(app: FastifyInstance) {
    app.register(productsRoutes, {prefix: '/products'})
}
