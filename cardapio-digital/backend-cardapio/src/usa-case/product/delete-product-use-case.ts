import { ProductRepository } from "@/infra/repositories/product-repository-interface";

interface DeleteProductUseCaseRequest {
    id: string
}

export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: DeleteProductUseCaseRequest) {
        await this.productRepository.delete(id.id)
    }
}