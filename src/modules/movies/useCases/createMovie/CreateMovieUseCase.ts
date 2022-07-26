import { Movies } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Session } from "../../../../shared/types/Session";
import { IGenreRepository } from "../../../genres/repositories/interfaces/IGenreRepository";
import { IUserRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";
import { IMovieRepository } from "../../repositories/interfaces/IMovieRepository";

@injectable()
export class CreateMovieUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("GenreRepository")
        private genreRepository: IGenreRepository,
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ){}

    async execute(body: CreateMovieDTO, {id}: Session): Promise<Movies> {
        const user = await this.userRepository.findById(id);
        if(!user.isAdmin) throw new AppError("User is not admin!", 401);

        const genreExists = await this.genreRepository.findById(body.genre_id);
        if(!genreExists) throw new AppError("Genre does not exists", 404);

        const movieAlreadyExists = await this.movieRepository.findByName(body.name);
        if(movieAlreadyExists) throw new AppError("Movie already exists");

        const movie = await this.movieRepository.create({ ...body, available: true});
        return movie;
    }
}