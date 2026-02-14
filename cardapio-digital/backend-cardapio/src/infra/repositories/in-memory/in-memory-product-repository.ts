import { randomUUID } from 'node:crypto'
import { Prisma, Product } from '../../../../generated/prisma/client'
import { ProductRepository } from '../product-repository-interface'



export class InMemoryProductRepository implements ProductRepository {


    public product: Product[] = []


    async getAllProducts() {
        return this.product
    }

    async getProductById(id: string) {
        const product = this.product.find((product) => product.id === id)
        if (!product) {
            return null
        }
        return product
    }

    async create(data: Prisma.ProductCreateInput) {
        const product = {
            id: randomUUID(),
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            active: true,
            imgUrl: data.imgUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.product.push(product)
        return product
    }

    async update(id: string, data: Prisma.ProductUpdateInput) {
        const productIndex = this.product.findIndex((product) => product.id === id)
        if (productIndex < 0) {
            throw new Error('Product not found.')
        }
        const product = this.product[productIndex]

        const newProduct = {
            ...product,
            id,
            name: data.name as string,
            description: data.description as string,
            price: data.price as number,
            category: data.category as string,
            active: data.active as boolean,
            imgUrl: data.imgUrl as string,
            createdAt: new Date(),
            updatedAt: new Date()
        }



        this.product[productIndex] = newProduct

        return newProduct
    }

    async delete(id: string): Promise<void> {
        const productIndex = this.product.findIndex((product) => product.id === id)
        if (productIndex < 0) {
            throw new Error('Product not found.')
        }
        this.product.splice(productIndex, 1)
    }



}
