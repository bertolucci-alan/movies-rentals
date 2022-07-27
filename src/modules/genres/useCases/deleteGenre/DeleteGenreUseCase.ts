import { Genre } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IMovieRepository } from "../../../movies/repositories/interfaces/IMovieRepository";
import { IUserRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { IGenreRepository } from "../../repositories/interfaces/IGenreRepository";

@injectable()
export class DeleteGenreUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("GenreRepository")
        private genreRepository: IGenreRepository
    ){}

    async execute(genre_id: string, user_id: string): Promise<Genre> {
        const user = await this.userRepository.findById(user_id);
        if(!user.isAdmin) throw new AppError("User is not admin!", 401);

        const genre = await this.genreRepository.delete(genre_id);
        return genre;
    }
}