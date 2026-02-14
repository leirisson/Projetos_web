
import { ErrorCreateProductEmptyUrl } from "@/errors/create-product-empyt-url-error"
import { ErrorPriceInvalid } from "@/errors/erro-price-invalid"
import { ErrorNameEmpty } from "@/errors/name-empty-error"
import { ProductRepository } from "@/infra/repositories/product-repository-interface"


export interface ProductUseCaseRequest {
    id?: string
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


export class CreateProductUseCase {
    constructor(
        private productRepository: ProductRepository, 
    ){} 

    async execute(request: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {

        if(request.price <= 0) {
            throw new ErrorPriceInvalid()
        }

        if(request.name.trim() === '') {
            throw new ErrorNameEmpty()
        }

        if(request.imgUrl === undefined || request.imgUrl.trim() === '' ) {
            throw new ErrorCreateProductEmptyUrl()
        }

        
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