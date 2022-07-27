import { Genre } from "@prisma/client";
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put, QueryParams } from "routing-controllers";
import { container } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { Session } from "../../../shared/types/Session";

import { CreateGenreDTO } from "../dtos/CreateGenreDTO";
import { UpdateGenreDTO } from "../dtos/UpdateGenreDTO";

import { CreateGenreUseCase } from "../useCases/createGenre/CreateGenreUseCase";
import { DeleteGenreUseCase } from "../useCases/deleteGenre/DeleteGenreUseCase";
import { ListGenresUseCase } from "../useCases/listGenres/ListGenresUseCase";
import { UpdateGenreUseCase } from "../useCases/updateGenre/UpdateGenreUseCase";

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

   @Authorized()
   @Put("/:genre_id")
   async update(
      @Body() body: UpdateGenreDTO,
      @Param('genre_id') genre_id: string,
      @CurrentUser() authUser: Session
   ): Promise<Genre> {
      const updateGenreUseCase = container.resolve(UpdateGenreUseCase);
      return await updateGenreUseCase.execute(genre_id, body, authUser.id);
   }

   @Get("/")
   async index(@QueryParams() param?: string): Promise<Genre[]> {
      const listGenresUseCase = container.resolve(ListGenresUseCase);
      return await listGenresUseCase.execute();
   }

   @Authorized()
   @Delete("/:genre_id")
   async delete(
      @Param('genre_id') genre_id: string,
      @CurrentUser() authUser: Session
   ): Promise<Genre> {
      const deleteGenreUseCase = container.resolve(DeleteGenreUseCase);
      return await deleteGenreUseCase.execute(genre_id, authUser.id);
   }
}