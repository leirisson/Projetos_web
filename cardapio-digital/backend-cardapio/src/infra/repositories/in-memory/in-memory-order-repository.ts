import { Order } from "generated/prisma/client";
import { OrderRepositoryInterface } from "../order-repository-interface";
import { randomUUID } from "node:crypto";



export class InMemoryOrderRepository implements OrderRepositoryInterface {
    public orders: Order[] = []
    async create(data: Order): Promise<Order> {
       const order = {
        id: randomUUID(),
        total: data.total,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
       }
        return order
    }
}