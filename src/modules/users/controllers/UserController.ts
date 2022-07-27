import { User } from "@prisma/client";
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Post, Put, QueryParams } from "routing-controllers";
import { container } from "tsyringe";
import { Session } from "../../../shared/types/Session";

import { CreateUserDTO } from "../dtos/CreteUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";

import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "../useCases/deleteUser/DeleteUserUseCase";
import { ListUsersUseCase } from "../useCases/listUsers/ListUsersUseCase";
import { UpdateUserUseCase } from "../useCases/updateUser/UpdateUserUseCase";

@JsonController("/users")
export class UserController {
    @Post("/")
    async create(@Body() body: CreateUserDTO): Promise<User> {
        const createUserUseCase = container.resolve(CreateUserUseCase);
        return await createUserUseCase.execute(body);
    }

    @Authorized()
    @Put("/")
    async update(
        @Body() body: UpdateUserDTO,
        @CurrentUser() authUser: Session
    ): Promise<User> {
        const updateUserUseCase = container.resolve(UpdateUserUseCase);
        return await updateUserUseCase.execute(body, authUser.id);
    }

    @Authorized()
    @Get("/")
    async index(@CurrentUser() authUser: Session): Promise<User[]> {
        const listUsersUseCase = container.resolve(ListUsersUseCase);
        return await listUsersUseCase.execute(authUser.id);
    }

    @Authorized()
    @Delete("/")
    async delete(@CurrentUser() authUser: Session): Promise<User> {
        const deleteUserUseCase = container.resolve(DeleteUserUseCase);
        return await deleteUserUseCase.execute(authUser.id);
    }
}