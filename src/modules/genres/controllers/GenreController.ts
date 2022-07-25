import { Genre } from "@prisma/client";
import { Body, JsonController, Post } from "routing-controllers";
import { container } from "tsyringe";
import { CreateGenreDTO } from "../dtos/CreateGenreDTO";
import { CreateGenreUseCase } from "../useCases/createGenre/CreateGenreUseCase";

@JsonController("/genres")
export class GenreController {
    @Post("/")
     async create(@Body() body: CreateGenreDTO): Promise<Genre> {
        const createGenreUseCase = container.resolve(CreateGenreUseCase);
        return await createGenreUseCase.execute(body);
     }
}