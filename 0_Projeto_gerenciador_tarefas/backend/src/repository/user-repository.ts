import { Prisma, User } from "generated/prisma/client"


export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findEmail(email: string): Promise<User | null>
}