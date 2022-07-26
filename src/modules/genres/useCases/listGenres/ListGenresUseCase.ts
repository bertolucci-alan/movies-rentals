import { Genre } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IGenreRepository } from "../../repositories/interfaces/IGenreRepository";

@injectable()
export class ListGenresUseCase {
    constructor(
        @inject("GenreRepository")
        private genreRepository: IGenreRepository
    ) {}

    async execute(): Promise<Genre[]> {
        const genres = await this.genreRepository.findAll();
        return genres;
    }
}