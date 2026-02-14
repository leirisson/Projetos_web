import { Order } from "generated/prisma/client";


export interface OrderRepositoryInterface {
    create(order: Order): Promise<Order>
}