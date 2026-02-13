import { Prisma } from '../../../../generated/prisma/client'
import prisma from '@/infra/prisma/index'
import { ProductRepository } from '../product-repository'
import { Product } from 'generated/prisma/browser'


export class PrismaProductRepository implements ProductRepository {
    
    async getAllProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany()
        return products
    }


    async create(data: Prisma.ProductCreateInput) {
        const product =  await prisma.product.create({
            data,
        })

        return product
    }
}