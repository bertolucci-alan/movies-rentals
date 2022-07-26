import { Genre } from "@prisma/client";
import { Authorized, Body, CurrentUser, Get, JsonController, Post, QueryParams } from "routing-controllers";
import { container } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { Session } from "../../../shared/types/Session";

import { CreateGenreDTO } from "../dtos/CreateGenreDTO";

import { CreateGenreUseCase } from "../useCases/createGenre/CreateGenreUseCase";
import { ListGenresUseCase } from "../useCases/listGenres/ListGenresUseCase";

@JsonController("/genres")
export class GenreController {
   @Authorized()
   @Post("/")
   async create(
      @CurrentUser() AuthUser: Session,
      @Body() body: CreateGenreDTO
   ): Promise<Genre> {
      const createGenreUseCase = container.resolve(CreateGenreUseCase);
      return await createGenreUseCase.execute(body, AuthUser);
   }

   @Get("/teste")
   async index(@QueryParams() param?: string): Promise<Genre[]> {
      const listGenresUseCase = container.resolve(ListGenresUseCase);
      return await listGenresUseCase.execute();
   }
}