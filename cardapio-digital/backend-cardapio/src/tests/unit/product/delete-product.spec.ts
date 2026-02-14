import {it, describe, expect} from 'vitest'
import { CreateProductUseCase } from "@/usa-case/product/create-product-use-case";
import { DeleteProductUseCase } from "@/usa-case/product/delete-product-use-case";
import { ProductRepository } from "@/infra/repositories/product-repository-interface";
import { InMemoryProductRepository } from "@/infra/repositories/in-memory/in-memory-product-repository";
import { randomUUID } from 'node:crypto';

const productRepository = new InMemoryProductRepository()
const createProductUseCase = new CreateProductUseCase(productRepository)
const deleteProductUseCase = new DeleteProductUseCase(productRepository)



describe('Delete Product UseCase', () => {
    it('should delete a product by id', async () => {
        const product = await createProductUseCase.execute({
            id: randomUUID(),
            name: 'Product 1',
            description: 'Description 1',
            price: 10.00,
            category: 'Category 1',
            imgUrl: 'image1.jpg',
        })
        
        await deleteProductUseCase.execute({
            id: product.id as string,
        })

        const products = await productRepository.getAllProducts()

        expect(products.length).equals(0)
    })
})