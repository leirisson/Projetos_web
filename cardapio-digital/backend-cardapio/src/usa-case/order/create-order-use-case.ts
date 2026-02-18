import { Order } from "generated/prisma/client"



export class CreateOrderUseCase {
    constructor(private orderRepository: OrderRepositoryInterface) {}
    async execute(data: Order): Promise<Order> {
        const order = await this.orderRepository.create(data)
        return order
    }
}