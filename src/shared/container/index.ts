import { container } from "tsyringe";
import './providers/dateProvider';
import { GenreRepository } from "../../modules/genres/repositories/GenreRepository";
import { IGenreRepository } from "../../modules/genres/repositories/interfaces/IGenreRepository";
import { IMovieRepository } from "../../modules/movies/repositories/interfaces/IMovieRepository";
import { MovieRepository } from "../../modules/movies/repositories/MovieRepository";
import { IRentalRepository } from "../../modules/rentals/repositories/interfaces/IRentalRepository";
import { RentalRepository } from "../../modules/rentals/repositories/RentalRepository";
import { IUserRepository } from "../../modules/users/repositories/interfaces/IUserRepository";
import { UserRepository } from "../../modules/users/repositories/UserRepository";

//registrando singletons para injeção de repositório em usecases

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

container.register<IGenreRepository>(
    "GenreRepository",
    GenreRepository
);

container.registerSingleton<IMovieRepository>(
    "MovieRepository",
    MovieRepository
)

container.registerSingleton<IRentalRepository>(
    "RentalRepository",
    RentalRepository
)