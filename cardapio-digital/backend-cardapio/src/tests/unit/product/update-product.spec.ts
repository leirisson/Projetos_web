import { InMemoryProductRepository } from '@/infra/repositories/in-memory/in-memory-product-repository'
import { CreateProductUseCase } from '@/usa-case/product/create-product-use-case'
import { UpdateProductUseCase } from '@/usa-case/product/update-product-use-case'
import { randomUUID } from 'node:crypto'
import { it, describe, expect } from 'vitest'


const productRepository = new InMemoryProductRepository()
const updateProductUseCase = new UpdateProductUseCase(productRepository)
const createProductUseCase = new CreateProductUseCase(productRepository)


describe('UpdateProductUseCase', () => {
    it('should update a product', async () => {

        const product = await createProductUseCase.execute({
            id: randomUUID(),
            name: 'Product 1',
            description: 'Description 1',
            price: 10.00,
            category: 'Category 1',
            imgUrl: 'image1.jpg',
        })

        const requestUpdate = {
            id: product.id!,
            data: {
                name: 'Product 1',
                price: 120,
                description: 'Product 1 description',
                category: 'Category 1',
                imgUrl: 'https://example.com/product-1.jpg',
            },
        }
        const productUpdated = await updateProductUseCase.execute(requestUpdate)
        expect(productUpdated.price).toBe(120)
    })
})