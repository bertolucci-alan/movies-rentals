import { User } from "@prisma/client";
import prismaClient from "../../../prisma";
import { ICreateUserDTO } from "../dtos/ICreteUserDTO";
import { IUserRepository } from "./interfaces/IUserRepository";


export class UserRepository implements IUserRepository {
    async create({name, email, password}: ICreateUserDTO): Promise<User> {
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
}