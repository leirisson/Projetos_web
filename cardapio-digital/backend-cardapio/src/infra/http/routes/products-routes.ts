import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { ProductController } from '@/infra/http/controllers/product-controller'
import { CreateProductUseCase } from '@/usa-case/create-product-use-case'
import { PrismaProductRepository } from '@/infra/repositories/prisma/prisma-product-repository'
import { ProductUploadImageUseCase } from '@/usa-case/product-upload-image-use-case'
import { UploaddImageRepository } from '@/infra/repositories/storage/upload-image-repository'
import { GetProductsUseCase } from '@/usa-case/get-products-use-case'



const productRepository = new PrismaProductRepository()
const uploadImageRepository = new UploaddImageRepository()

const productUploadImageUseCase = new ProductUploadImageUseCase(uploadImageRepository)
const productCreateUseCase = new CreateProductUseCase(productRepository)
const getProductsUseCase = new GetProductsUseCase(productRepository)

const productController = new ProductController(productCreateUseCase, productUploadImageUseCase, getProductsUseCase)



export function productsRoutes(app: FastifyInstance) {
    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => productController.getProducts(request, reply))
    app.post('/', async (request: FastifyRequest, reply: FastifyReply) => productController.create(request, reply))
}
