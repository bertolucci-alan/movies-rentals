import { Genre } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateGenreDTO } from "../../dtos/CreateGenreDTO";
import { IGenreRepository } from "../../repositories/interfaces/IGenreRepository";

@injectable()
export class CreateGenreUseCase {
    constructor(
        @inject('GenreRepository')
        private genreRepository: IGenreRepository
    ){}

    async execute({name}: CreateGenreDTO): Promise<Genre> {
        const genreAlreadyExists = await this.genreRepository.findByName(name);

        if(genreAlreadyExists) throw new AppError("Genrer Already Exists", )
        const genre = await this.genreRepository.create({name});
        return genre;
    }
}