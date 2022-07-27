import { Movies } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { IMovieRepository } from "../../repositories/interfaces/IMovieRepository";

@injectable()
export class DeleteMovieUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("MovieRepository")
        private movieRepository: IMovieRepository
    ){}

    async execute(id: string, user_id: string): Promise<Movies> {
        const user = await this.userRepository.findById(user_id);
        if(!user.isAdmin) throw new AppError("User is not admin!", 401);

        const movie = await this.movieRepository.delete(id);
        return movie;
    }
}