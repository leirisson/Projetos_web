import { Prisma, Product } from '../../../../generated/prisma/client'
import { ProductRepository } from '../product-repository'

export class InMemoryProductRepository implements ProductRepository {
    product: Product[] = []
    
     getAllProducts(): Promise<Product[]> {
        return Promise.resolve(this.product)
    }


    async create(data: Product): Promise<Product> {
        this.product.push(data)
        return this.product.find((item) => item.id === data.id) as Product
    }
}