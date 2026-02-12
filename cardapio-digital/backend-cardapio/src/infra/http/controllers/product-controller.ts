import { FastifyReply, FastifyRequest } from "fastify"
import { ProductCreateUseCase, ProductUseCaseRequest } from '@/application/usa-case/product-case-create-product'
import { CreateProductError } from '@/domain/errors/create-product-error'
import { ProductUploadImageUseCase } from "@/application/usa-case/product-upload-image-use-case"
import z from 'zod'
import '@fastify/multipart'

export class ProductController {
    constructor(
        private productUseCase: ProductCreateUseCase,
        private productUploadImageUseCase: ProductUploadImageUseCase,
    ) { }


    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as any

            const name = body.name?.value
            const description = body.description?.value
            const price = parseFloat(body.price?.value)
            const category = body.category?.value
            const img = body.file

            if (!img) {
                return reply.status(400).send({ message: 'Image is required' })
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
                return reply.status(400).send({ message: 'Invalid product request' })
            }

            const  url  = await this.uploadProductImage({
                filename: img.filename,
                mimetype: img.mimetype,
                buffer: convertImgToBuffer
            })

            console.log("url da imagem: "  + url)

            const product = await this.productUseCase.execute({
                name,
                description,
                price,
                category,
                imgUrl: url || undefined,
            })

            return reply.status(201).send({ product })

        } catch (error) {
            console.error('❌ Error creating product:', error)
            if (error instanceof CreateProductError) {
                return reply.status(400).send({ message: error.message })
            }
            return reply.status(500).send({ message: 'Internal server error' })
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
