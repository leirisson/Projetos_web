import { ProductRepository } from "@/infra/repositories/product-repository"



export class GetProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute() {
        const products = await this.productRepository.getAllProducts()
        return products
    }
}