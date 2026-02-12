
import { ProductRepository } from "@/infra/repositories/product-repository"


export interface ProductUseCaseRequest {
    name: string
    price: number
    description: string
    category: string
    imgUrl: string | undefined
}

interface ProductUseCaseResponse {
    id?: string
    name: string
    price: number
    description: string
    imgUrl?: string
    category?: string
}


export class ProductCreateUseCase {
    constructor(
        private productRepository: ProductRepository, 
    ){} 

    async execute(request: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {

        const product = await this.productRepository.create({
            name: request.name,
            price: request.price,
            description: request.description,
            category: request.category,
            imgUrl: request.imgUrl || '',
        })

        return product
    }
}