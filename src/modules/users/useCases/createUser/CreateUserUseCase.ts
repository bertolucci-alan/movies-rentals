import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import prismaClient from "../../../../prisma";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateUserDTO } from "../../dtos/CreteUserDTO";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({name, email, password}: CreateUserDTO): Promise<User> {
        const userAlredyExist = await this.userRepository.findByEmail(email);
        if(userAlredyExist) {
            throw new AppError("User already exists!");
        }

        const passwordHash = await hash(password, 8);
        const user = await this.userRepository.create({name, email, password: passwordHash});
        
        return user;
    }
}