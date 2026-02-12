import { Prisma } from '../../../../generated/prisma/client'
import prisma from '@/infra/prisma/index'
import { ProductRepository } from '../product-repository'


export class PrismaProductRepository implements ProductRepository {
    async create(data: Prisma.ProductCreateInput) {
        const product =  await prisma.product.create({
            data,
        })

        return product
    }
}