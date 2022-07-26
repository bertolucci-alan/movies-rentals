import { Rental } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/interfaces/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IMovieRepository } from "../../../movies/repositories/interfaces/IMovieRepository";
import { IUserRepository } from "../../../users/repositories/interfaces/IUserRepository";
import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";
import { IRentalRepository } from "../../repositories/interfaces/IRentalRepository";

@injectable()
export class CreateRentalUseCase {
    constructor(
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("MovieRepository")
        private movieRepository: IMovieRepository,
        @inject("RentalRepository")
        private rentalRepository: IRentalRepository
    ){}

    async execute(body: CreateRentalDTO, userId: string): Promise<Rental> {
        const userExists = await this.userRepository.findById(userId);
        if(!userExists) throw new AppError("User does not exists!", 401);

        const movieExists = await this.movieRepository.findById(body.movie_id);
        if(!movieExists) throw new AppError("Movie does not exists!", 401);

        if(!movieExists.available) throw new AppError("Movie unavailable!");

        const userOpenRental = await this.rentalRepository.findUserOpenRental(userId);
        if(userOpenRental) throw new AppError("User have an open rental!");

        //expect_return_date must be at least 24 hours apart from the current date
        const minimumHours = 24;
        if(this.dayjsDateProvider.compareInHours(
            this.dayjsDateProvider.dateNow(), body.expect_return_date
        ) < minimumHours) {
            throw new AppError("Invalid time!");
        }

        const rental = await this.rentalRepository.create(body, userId);
        return rental;
    }
}