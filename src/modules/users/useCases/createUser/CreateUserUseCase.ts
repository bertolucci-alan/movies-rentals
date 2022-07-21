import { User } from "@prisma/client";
import prismaClient from "../../../../prisma";
import { ICreateUserDTO } from "../../dtos/ICreteUserDTO";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";


export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async execute({name, email, password}: ICreateUserDTO): Promise<User> {
        const userAlredyExist = await this.userRepository.findByEmail(email);
        if(userAlredyExist) {
            throw new Error("User already exists!");
        }
        const user = await this.userRepository.create({name, email, password});
        return user;
    }
}