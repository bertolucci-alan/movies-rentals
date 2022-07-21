import { Request, Response } from "express";
import { Get, JsonController, Post } from "routing-controllers";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";

@JsonController("/users")
export class UserController {
    @Post("/")
    async create(request: Request, response: Response) {
        const {name, email, password} = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const user = await createUserUseCase.execute({name, email, password});

        return response.status(201).json(user);
    }

    @Get("/users")
    async index(request: Request, response: Response): Promise<any> {
        return "teste";
    }
}