import { ProductRepository } from "@/infra/repositories/product-repository-interface";
import { Prisma } from "generated/prisma/client";


interface UpdateProductUseCaseRequest {
    id: string
    data: Prisma.ProductUpdateInput
}




export class UpdateProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(request: UpdateProductUseCaseRequest) {
        const product = await this.productRepository.update(request.id, request.data)
        return product
    }
}