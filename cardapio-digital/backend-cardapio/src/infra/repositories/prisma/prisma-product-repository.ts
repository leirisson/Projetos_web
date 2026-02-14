import { Prisma } from '../../../../generated/prisma/client'
import prisma from '@/infra/prisma/index'
import { ProductRepository } from '../product-repository-interface'
import { Product } from 'generated/prisma/browser'


export class PrismaProductRepository implements ProductRepository {


    async getAllProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany()
        return products
    }

    async getProductById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: {
                id,
            }
        })
        return product || null
    }


    async create(data: Prisma.ProductCreateInput) {
        const product = await prisma.product.create({
            data,
        })

        return product
    }


    async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
        const product = await prisma.product.update({
            where: {
                id,
            },
            data,
        })
        return product
    }

    async delete(id: string) {
        await prisma.product.delete({
            where: {
                id,
            }
        })
    }
}