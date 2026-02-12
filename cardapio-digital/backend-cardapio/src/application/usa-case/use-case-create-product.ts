import { PrismaProductRepository } from "@/infra/repositories/prisma-product-repository"

interface ProductUseCaseRequest {
    name: string
    price: number
    description: string
    category: string
}

interface ProductUseCaseResponse {
    id: string
    name: string
    price: number
    description: string
    category: string
}


export class UseCaseCreateProduct {
    constructor(private productRepository: PrismaProductRepository){} 

    async execute(request: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
        const product = await this.productRepository.create({
            name: request.name,
            price: request.price,
            description: request.description,
            category: request.category,
        })

        return product
    }
}