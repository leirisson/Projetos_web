import { Prisma } from '../../../generated/prisma/client'
import prisma from '@/infra/prisma/index'


export class PrismaProductRepository {
    async create(data: Prisma.ProductCreateInput) {
        const product =  await prisma.product.create({
            data,
        })

        return product
    }
}