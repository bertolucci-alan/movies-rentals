import { User } from "@prisma/client";
import prismaClient from "../../../prisma";
import { Session } from "../../../shared/types/Session";
import { CreateUserDTO } from "../dtos/CreteUserDTO";
import { IUserRepository } from "./interfaces/IUserRepository";


export class UserRepository implements IUserRepository {
    async create({name, email, password}: CreateUserDTO): Promise<User> {
        const user = await prismaClient.user.create({
            data: {
                name, 
                email,
                password,
                isAdmin: false
            }
        });
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {email}
        });
        return user as User;
    }

    async findById(id: string): Promise<User> {
        const user = await prismaClient.user.findFirst({where: {id}});
        return user as User;
    }
}