import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { ProductController } from '@/infra/http/controllers/product-controller'
import { ProductCreateUseCase } from '@/application/usa-case/product-case-create-product'
import { PrismaProductRepository } from '@/infra/repositories/prisma/prisma-product-repository'
import { ProductUploadImageUseCase } from '@/application/usa-case/product-upload-image-use-case'
import { UploaddImageRepository } from '@/infra/repositories/storage/upload-image-repository'


const productRepository = new PrismaProductRepository()
const uploadImageRepository = new UploaddImageRepository()
const productUploadImageUseCase = new ProductUploadImageUseCase(uploadImageRepository)
const productCreateUseCase = new ProductCreateUseCase(productRepository)
const productController = new ProductController(productCreateUseCase, productUploadImageUseCase)



export function productsRoutes(app: FastifyInstance) {
    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => productController.create(request, reply))
}
