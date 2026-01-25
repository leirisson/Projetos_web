import { InMemoryRepository } from '.././repository/inMemory/in.memory.repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { hash } from 'bcryptjs'
import { InvalideCrentialError } from './errors/invalideCrentialError'


let userRepository: InMemoryRepository
let sut: AuthenticateUserUseCase

describe('Athenticate Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryRepository()
        sut = new AuthenticateUserUseCase(userRepository)
    })

    it('should be able to authenticate', async () => {
        await userRepository.create({
            name: "Leirisson",
            email: "leirisson@example.com",
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            email: "leirisson@example.com",
            password: "123456"
        })

        expect(user.name).toEqual("Leirisson")

    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(sut.execute({
            email: "leirisson.santos@example.com",
            password: "123456"
        })).rejects.toBeInstanceOf(InvalideCrentialError)

    })

    it('should be able to authenticate with wrong password', async () => {
        await userRepository.create({
            name: "Leirisson",
            email: "leirisson@example.com",
            password_hash: await hash('123456', 6),
        })

        await expect(sut.execute({
            email: "leirisson.santos@gmail.com",
            password: "123456789"
        })).rejects.toBeInstanceOf(InvalideCrentialError)
    })


})