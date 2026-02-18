import { it, describe, expect } from 'vitest'



describe('Create Order UseCase', () => {
    it('should create a new order', async () => {
        const order = await createOrderUseCase.execute({
            total: 100.00,
            status: 'pending',
        })
    })
})
