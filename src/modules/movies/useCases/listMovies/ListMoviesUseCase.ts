import { Movies } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IMovieRepository, IRequestFindAllMovie } from "../../repositories/interfaces/IMovieRepository";

@injectable()
export class ListMoviesUseCase {
    constructor(
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ){}

    async execute({name, genre_id}: IRequestFindAllMovie): Promise<Movies[]> {
        const movies = await this.movieRepository.findAll({name, genre_id});
        return movies;
    }
}