import { Genre } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { UpdateGenreDTO } from "../../dtos/UpdateGenreDTO";
import { IGenreRepository } from "../../repositories/interfaces/IGenreRepository";

@injectable()
export class UpdateGenreUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("GenreRepository")
        private genreRepository: IGenreRepository,
    ){}

    async execute(genre_id: string, body: UpdateGenreDTO, user_id: string): Promise<Genre> {
        const user = await this.userRepository.findById(user_id);
        if(!user.isAdmin) throw new AppError("User is not admin!", 401);

        const genre = await this.genreRepository.update(body, genre_id);
        return await genre;
    }
}