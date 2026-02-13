import { FastifyReply, FastifyRequest } from "fastify"
import { CreateProductUseCase, ProductUseCaseRequest } from '@/usa-case/create-product-use-case'
import { CreateProductError } from '@/errors/create-product-error'
import { ProductUploadImageUseCase } from "@/usa-case/product-upload-image-use-case"
import z from 'zod'
import '@fastify/multipart'
import { GetProductsUseCase } from "@/usa-case/get-products-use-case"
import { UploadImageError } from "@/errors/upload-image-error"

export class ProductController {
    constructor(
        private createProductUseCase: CreateProductUseCase,
        private productUploadImageUseCase: ProductUploadImageUseCase,
        private getProductsUseCase: GetProductsUseCase,
    ) { }

    async getProducts(request: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await this.getProductsUseCase.execute()
            return reply.status(200).send({ products })
        } catch (error) {
            console.error('❌ Error getting products:', error)
            return reply.status(500).send({ message: 'Internal server error' })
        }
    }


    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as any

            const name = body.name?.value
            const description = body.description?.value
            const price = parseFloat(body.price?.value)
            const category = body.category?.value
            const img = body.file

            if (!img) {
                throw new UploadImageError()
            }

            // ✅ usando  método toBuffer() que vem no objeto do multipart
            // para converter o arquivo em um buffer
            const convertImgToBuffer = await img.toBuffer()

            const isValid = await this.validateProductRequest({
                name,
                description,
                price,
                category,
                imgUrl: img.filename
            })

            if (!isValid) {
                throw new CreateProductError()
            }

            const  url  = await this.uploadProductImage({
                filename: img.filename,
                mimetype: img.mimetype,
                buffer: convertImgToBuffer
            })

      

            const product = await this.createProductUseCase.execute({
                name,
                description,
                price,
                category,
                imgUrl: url || undefined,
            })

            return reply.status(201).send({ product })

        } catch (error) {
            if (error instanceof UploadImageError) {
                return reply.status(400).send({ message: error.message })
            }
            if (error instanceof CreateProductError) {
                return reply.status(400).send({ message: error.message })
            }
            throw error
        }
    }


    private async validateProductRequest(request: ProductUseCaseRequest) {
        const productSchema = z.object({
            name: z.string().min(1),
            price: z.number().min(0),
            description: z.string().min(1),
            category: z.string().min(1),
            imgUrl: z.string().optional(),
        })
        return productSchema.parse(request)
    }

    private async uploadProductImage(fileData: {
        filename: string,
        mimetype: string,
        buffer: Buffer
    }): Promise<string> {
        const imgUrl = await this.productUploadImageUseCase.execute({
            fileName: fileData.filename,
            fileBuffer: fileData.buffer,
            contentType: fileData.mimetype,
        })
        return imgUrl.url
    }
}
