import { Movies } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IMovieRepository } from "../../repositories/interfaces/IMovieRepository";

@injectable()
export class ListMoviesUseCase {
    constructor(
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ){}

    async execute(): Promise<Movies[]> {
        const movies = await this.movieRepository.findAll();
        return movies;
    }
}