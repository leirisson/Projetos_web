import { it, expect, describe, beforeEach } from 'vitest'
import { GetAllProductsUseCase } from '@/usa-case/product/get-all-products-use-case'
import { InMemoryProductRepository } from '@/infra/repositories/in-memory/in-memory-product-repository'
import {CreateProductUseCase} from '@/usa-case/product/create-product-use-case'
import { randomUUID } from 'node:crypto'



const productRepository = new InMemoryProductRepository()
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository)
const createProductUseCase = new CreateProductUseCase(productRepository)

beforeEach(async () => {
    await createProductUseCase.execute({
        name: 'Product 1',
        description: 'Description 1',
        price: 10.00,
        category: 'Category 1',
        imgUrl: 'image1.jpg',
    })
    await createProductUseCase.execute({
        name: 'Product 2',
        description: 'Description 2',
        price: 20.00,
        category: 'Category 2',
        imgUrl: 'image2.jpg',
    })
})

describe('GetAllProductsUseCase', () => {
    it('should return all products', async () => {
        const products = await getAllProductsUseCase.execute()
        expect(products).toHaveLength(2)
    })
})
