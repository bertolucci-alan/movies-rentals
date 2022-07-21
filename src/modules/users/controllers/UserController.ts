import { User } from "@prisma/client";
import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";

const userRepository = new UserRepository();

export class UserController {
    async create(request: Request, response: Response) {
        const {name, email, password} = request.body;
        const createUserUseCase = new CreateUserUseCase(userRepository);
        const user = await createUserUseCase.execute({name, email, password});

        return response.status(201).json(user);
    }
}