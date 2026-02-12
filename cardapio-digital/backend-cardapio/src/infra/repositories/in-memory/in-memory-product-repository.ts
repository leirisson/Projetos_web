import { Prisma, Product } from '../../../../generated/prisma/client'
import { ProductRepository } from '../product-repository'

export class InMemoryProductRepository implements ProductRepository {
    product: Prisma.ProductCreateInput[] = []

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        this.product.push(data)
        return this.product.find((item) => item.id === data.id) as Product
    }
}