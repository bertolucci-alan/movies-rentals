import { User } from "@prisma/client";
import prismaClient from "../../../prisma";
import { Session } from "../../../shared/types/Session";
import { CreateUserDTO } from "../dtos/CreteUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
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

    async update({name, email, password}: UpdateUserDTO, id: string ): Promise<User> {
        const user = await prismaClient.user.update({
            where: {id},
            data: {
                name,
                email,
                password
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

    async findAll(): Promise<User[]> {
        const users = await prismaClient.user.findMany();
        return users;
    }
}