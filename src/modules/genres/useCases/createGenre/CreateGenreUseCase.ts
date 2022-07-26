import { Genre } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Session } from "../../../../shared/types/Session";
import { IUserRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { CreateGenreDTO } from "../../dtos/CreateGenreDTO";
import { IGenreRepository } from "../../repositories/interfaces/IGenreRepository";

@injectable()
export class CreateGenreUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('GenreRepository')
        private genreRepository: IGenreRepository
    ){}

    async execute({name}: CreateGenreDTO, authUser: Session): Promise<Genre> {
        const user = await this.userRepository.findById(authUser.id);
        if(!user.isAdmin) throw new AppError("User is not admin", 401);

        const genreAlreadyExists = await this.genreRepository.findByName(name);
        if(genreAlreadyExists) throw new AppError("Genrer Already Exists");

        const genre = await this.genreRepository.create({name});
        return genre;
    }
}