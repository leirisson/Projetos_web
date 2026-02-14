import { ProductRepository } from "@/infra/repositories/product-repository-interface";


export class GetProductByIdUseCase{
    constructor(private productRepository: ProductRepository) { }

    async execute(id: string) {
        const product = await this.productRepository.getProductById(id)
        return product
    }
}