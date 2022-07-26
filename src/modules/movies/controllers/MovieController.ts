import { Movies } from "@prisma/client";
import { Authorized, Body, CurrentUser, Get, JsonController, Post, QueryParam, QueryParams } from "routing-controllers";
import { container } from "tsyringe";
import { Session } from "../../../shared/types/Session";
import { CreateMovieDTO } from "../dtos/CreateMovieDTO";
import { IRequestFindAllMovie } from "../repositories/interfaces/IMovieRepository";
import { CreateMovieUseCase } from "../useCases/createMovie/CreateMovieUseCase";
import { ListMoviesUseCase } from "../useCases/listMovies/ListMoviesUseCase";

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

    @Get("/")
    async index(@QueryParams() {name, genre_id}: IRequestFindAllMovie): Promise<Movies[]> {
        const listMoviesUseCase = container.resolve(ListMoviesUseCase);
        return await listMoviesUseCase.execute({name, genre_id});
    }
}