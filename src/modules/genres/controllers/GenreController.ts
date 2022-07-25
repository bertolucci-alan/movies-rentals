import { Genre } from "@prisma/client";
import { Authorized, Body, CurrentUser, JsonController, Post } from "routing-controllers";
import { container } from "tsyringe";
import { Session } from "../../../shared/types/Session";
import { CreateGenreDTO } from "../dtos/CreateGenreDTO";
import { CreateGenreUseCase } from "../useCases/createGenre/CreateGenreUseCase";

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
}