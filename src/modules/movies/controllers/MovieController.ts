import { Movies } from "@prisma/client";
import { Authorized, Body, CurrentUser, Get, JsonController, Param, Post, Put, QueryParam, QueryParams } from "routing-controllers";
import { container } from "tsyringe";
import { Session } from "../../../shared/types/Session";
import { CreateMovieDTO } from "../dtos/CreateMovieDTO";
import { UpdateMovieDTO } from "../dtos/UpdateMovieDTO";
import { IRequestFindAllMovie } from "../repositories/interfaces/IMovieRepository";
import { CreateMovieUseCase } from "../useCases/createMovie/CreateMovieUseCase";
import { ListMoviesUseCase } from "../useCases/listMovies/ListMoviesUseCase";
import { UpdateMovieUseCase } from "../useCases/updateMovie/UpdateMovieUseCase";

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

    @Authorized()
    @Put("/:movie_id")
    async update(
        @Body() body: UpdateMovieDTO,
        @Param('movie_id') movie_id: string,
        @CurrentUser() authUser: Session
    ): Promise<Movies> {
        const updateMovieUseCase = container.resolve(UpdateMovieUseCase);
        return await updateMovieUseCase.execute(movie_id, body, authUser.id);
    }

    @Get("/")
    async index(@QueryParams() {name, genre_id}: IRequestFindAllMovie): Promise<Movies[]> {
        const listMoviesUseCase = container.resolve(ListMoviesUseCase);
        return await listMoviesUseCase.execute({name, genre_id});
    }
}