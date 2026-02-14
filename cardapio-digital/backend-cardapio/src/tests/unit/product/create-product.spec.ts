import { it, expect, describe } from 'vitest'
import { CreateProductUseCase } from '@/usa-case/product/create-product-use-case'
import { InMemoryProductRepository } from '@/infra/repositories/in-memory/in-memory-product-repository'
import { ErrorPriceInvalid } from '@/errors/erro-price-invalid'
import { ErrorNameEmpty } from '@/errors/name-empty-error'
import { randomUUID } from 'node:crypto'

const productRepository = new InMemoryProductRepository()
const createProductUseCase = new CreateProductUseCase(productRepository)

describe('CreateProductUseCase', () => {
    it('should create a product', async () => {
        const product = await createProductUseCase.execute({
            id: randomUUID(),
            name: 'Product 1',
            price: 100,
            description: 'Product 1 description',
            category: 'Category 1',
            imgUrl: 'https://example.com/product-1.jpg',
        })
        expect(product.id).toEqual(expect.any(String))
    })

    it('should not create a product with invalid price', async () => {
        await expect(createProductUseCase.execute({
            name: 'Product 1',
            price: 0,
            description: 'Product 1 description',
            category: 'Category 1',
            imgUrl: 'https://example.com/product-1.jpg',
        })).rejects.toBeInstanceOf(ErrorPriceInvalid)
    })

    it('should not create a product with empty name', async () => {
        await expect(createProductUseCase.execute({
            name: '',
            price: 100,
            description: 'Product 1 description',
            category: 'Category 1',
            imgUrl: 'https://example.com/product-1.jpg',
        })).rejects.toBeInstanceOf(ErrorNameEmpty)
    })

    it('should not create a product with empty url', async () => {
        await expect(createProductUseCase.execute({
            name: 'Product 1',
            price: 100,
            description: 'Product 1 description',
            category: 'Category 1',
            imgUrl: '',
        })).rejects.toThrow()
    })

})


