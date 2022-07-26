import { User } from "@prisma/client";
import { Authorized, Body, CurrentUser, Get, JsonController, Post, Put, QueryParams } from "routing-controllers";
import { container } from "tsyringe";
import { Session } from "../../../shared/types/Session";
import { ListGenresUseCase } from "../../genres/useCases/listGenres/ListGenresUseCase";
import { CreateUserDTO } from "../dtos/CreteUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";
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
        @CurrentUser() authId: Session
    ): Promise<User> {
        const updateUserUseCase = container.resolve(UpdateUserUseCase);
        return await updateUserUseCase.execute(body, authId.id);
    }
}