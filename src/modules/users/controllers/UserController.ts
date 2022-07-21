import { User } from "@prisma/client";
import { Request, Response } from "express";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { container } from "tsyringe";
import { CreateUserDTO } from "../dtos/CreteUserDTO";
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";

@JsonController("/users")
export class UserController {
    @Post("/")
    async create(@Body() body: CreateUserDTO): Promise<User> {
        const createUserUseCase = container.resolve(CreateUserUseCase);
        return await createUserUseCase.execute(body);
    }
}