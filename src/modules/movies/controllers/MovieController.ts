import { Movies } from "@prisma/client";
import { Authorized, Body, CurrentUser, JsonController, Post } from "routing-controllers";
import { container } from "tsyringe";
import { Session } from "../../../shared/types/Session";
import { CreateMovieDTO } from "../dtos/CreateMovieDTO";
import { CreateMovieUseCase } from "../useCases/createMovie/CreateMovieUseCase";

@JsonController("/movies")
export class MovieController {
    @Authorized()
    @Post("/")
    async create(
        @Body() body: CreateMovieDTO,
        @CurrentUser() authUser: Session
    ): Promise<Movies> {
        const createMovieUseCase = container.resolve(CreateMovieUseCase);
        return await createMovieUseCase.execute(body, authUser);
    }
}