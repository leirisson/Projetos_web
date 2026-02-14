import { ProductRepository } from "@/infra/repositories/product-repository-interface"



export class GetAllProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute() {
        const products = await this.productRepository.getAllProducts()
        return products
    }
}