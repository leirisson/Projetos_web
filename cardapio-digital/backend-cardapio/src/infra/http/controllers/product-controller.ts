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
        const img = await request.file();
        const { name, description, price, category } = request.body as ProductUseCaseRequest

        try {
            const url = await this.uploadProductImage(img)
            const isValid = await this.validateProductRequest({ name, description, price, category, imgUrl: img?.filename })
            
            if (!isValid) {
                reply.status(400).send({ message: 'Invalid product request' })
            }

            const product = await this.productUseCase.execute({
                name,
                description,
                price,
                category,
                imgUrl: url,
            })
            reply.status(201).send({ product })

        } catch (error) {
            if (error instanceof CreateProductError) {
                reply.status(400).send({ message: error.message })
            }
        }
    }


    private async toBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
        const chunks: Buffer[] = []
        return await new Promise<Buffer>((resolve, reject) => {
            stream.on('data', (chunk) => {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
            })
            stream.on('error', reject)
            stream.on('end', () => resolve(Buffer.concat(chunks)))
        })
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

    private async uploadProductImage(img: any) {
        if (img) {
            const imgUrl = await this.productUploadImageUseCase.execute({
                fileName: img.filename,
                fileBuffer: await this.toBuffer(img.file),
                contentType: img.mimetype,
            })
            return imgUrl.url
        }
    }

}
