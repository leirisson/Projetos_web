import { Prisma, Product } from "generated/prisma/browser";


export interface ProductRepository {
    getAllProducts(): Promise<Product[]>
    getProductById(id: string): Promise<Product | null>
    create(data: Prisma.ProductCreateInput): Promise<Product>
    update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>
    delete(id: string): Promise<void>
}

