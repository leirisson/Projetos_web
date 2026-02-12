import { Prisma, Product } from "generated/prisma/browser";


export interface ProductRepository {
    create(data: Prisma.ProductCreateInput): Promise<Product>
}

