import { UserRepository } from "@/repository/user-repository";
import { User } from "generated/prisma/client";
import { InvalideCrentialError } from "./errors/invalideCrentialError";
import { compare } from "bcryptjs";


interface authenticateUseCaseRequest {
    email: string
    password: string
}


interface authenticateUseCaseResponse {
    user: User
}

export class AuthenticateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ email, password }: authenticateUseCaseRequest): Promise<authenticateUseCaseResponse> {
        const user = await this.userRepository.findEmail(email)

        if (!user) {
            throw new InvalideCrentialError()
        }

        const doesPassWordMatches = await compare(password, user.password_hash)

        if (!doesPassWordMatches) {
            throw new InvalideCrentialError()
        }

        return { user }
    }
}