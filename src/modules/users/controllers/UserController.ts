import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";
export class UserController {
    async create(request: Request, response: Response) {
        const {name, email, password} = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const user = await createUserUseCase.execute({name, email, password});

        return response.status(201).json(user);
    }
}