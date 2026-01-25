import { UserCreateInput } from "generated/prisma/models";
import { UserRepository } from "../user-repository";
import { User } from "generated/prisma/client";
import { randomUUID } from "node:crypto";




export class InMemoryRepository implements UserRepository {

    private listUsers: UserCreateInput[] = []
    
    
    async findEmail(email: string): Promise<User | null> {
        const user = await this.listUsers.find( user => user.email === email)
        
        if(!user){
            return null
        }
        return user as User
        
    }

    async create(data: UserCreateInput): Promise<User> {

        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            createdAt: new Date(),
            updateAt: new Date()

        }

        this.listUsers.push(user)

        return user
    }

}