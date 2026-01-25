import { it, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register-use-case'
import { InMemoryRepository } from '.././repository/inMemory/in.memory.repository'
import { compare } from 'bcryptjs'
import { UserAlredyExistsError } from './errors/UserAlredyExistsError'




let userRepository: InMemoryRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it('should be able register user', async () => {
        const { user } = await sut.execute({
            name: "Leirisson",
            email: "leirisson@example.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('shoud hash user user password upon registrtions', async () => {
        const { user } = await sut.execute({
            name: "Leirisson",
            email: "leirisson@example.com",
            password: "123456"
        })

        const isPasswodCorreclyHash = await compare('123456', user.password_hash)

        expect(isPasswodCorreclyHash).toBe(true)
    })

    it('shoul be from error with duplicate email', async () => {
        const emailExample = "leirisson.santos@emxaple.com"

        await sut.execute({
            name: "Leirisson",
            email: emailExample,
            password: "123456"
        })

        // Segundo registro: deve falhar
        await expect(sut.execute({
            name: "Leirisson",
            email: emailExample,
            password: "123456"
        })).rejects.instanceOf(UserAlredyExistsError)
    })
})
