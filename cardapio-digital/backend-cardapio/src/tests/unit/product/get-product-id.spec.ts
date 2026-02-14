import { it, expect, describe, } from 'vitest'
import { GetProductByIdUseCase } from "@/usa-case/product/get-product-bi-id-use-case"
import { InMemoryProductRepository } from '@/infra/repositories/in-memory/in-memory-product-repository'
import {CreateProductUseCase} from '@/usa-case/product/create-product-use-case'



const productRepository = new InMemoryProductRepository()
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository)
const createProductUseCase = new CreateProductUseCase(productRepository)

describe('GetProductByIdUseCase', () => {
    it('should return a product by id', async () => {
        const product = await createProductUseCase.execute({
            name: 'Product 1',
            description: 'Description 1',
            price: 10.00,
            category: 'Category 1',
            imgUrl: 'image1.jpg',
        })

        const id = product.id!
        const productById = await getProductByIdUseCase.execute(id)
        expect(productById).toEqual(product)
    })
})