import { Prisma, Product } from "generated/prisma/browser";


export interface ProductRepository {
    getAllProducts(): Promise<Product[]>
    create(data: Prisma.ProductCreateInput): Promise<Product>
}

