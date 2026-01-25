import { UserRepository } from "@/repository/user-repository"
import { hash } from "bcryptjs"
import { User } from "generated/prisma/client"
import { UserAlredyExistsError } from "./errors/UserAlredyExistsError"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const password_hash = await hash(password, 6)

        //verifica se o email ja existe
        const userWhitEmail = await this.userRepository.findEmail(email)

        if (userWhitEmail) {
            throw new UserAlredyExistsError()
        }

        const user = await this.userRepository.create({ name, email, password_hash })

        return { user, }
    }
}