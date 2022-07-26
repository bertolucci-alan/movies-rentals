import { Movies } from "@prisma/client";
import prismaClient from "../../../prisma";
import { CreateMovieDTO } from "../dtos/CreateMovieDTO";
import { UpdateMovieDTO } from "../dtos/UpdateMovieDTO";
import { IMovieRepository, IRequestFindAllMovie } from "./interfaces/IMovieRepository";


export class MovieRepository implements IMovieRepository {
    async create({name, description, daily_rate, fine_amount, available, genre_id}: CreateMovieDTO): Promise<Movies> {
        const movie = await prismaClient.movies.create({
            data: {
                name,
                description,
                daily_rate,
                fine_amount,
                available,
                genre_id,
            }
        });
        return movie;
    }

    async update({
        name, description, daily_rate, fine_amount, available, genre_id
    }: UpdateMovieDTO, id: string): Promise<Movies> {
        const movie = await prismaClient.movies.update({
            where: {id},
            data: {
                name,
                description,
                daily_rate,
                fine_amount,
                available,
                genre_id
            }
        });
        return movie;
    }

    async findByName(name: string): Promise<Movies> {
        const movie = await prismaClient.movies.findFirst({where: {name}});
        return movie as Movies;
    }

    async findById(id: string): Promise<Movies> {
        const movie = await prismaClient.movies.findFirst({where: {id}});
        return movie as Movies;
    }

    async findAll({name, genre_id}: IRequestFindAllMovie): Promise<Movies[]> {
        const availableMovies = await prismaClient.movies.findMany({where: {available: true}});
        if(name) {
            const movies = availableMovies.filter((movie) => movie.name === name);
            return movies;
        }
        else if(genre_id) {
            const movies = availableMovies.filter((movie) => movie.genre_id === genre_id);
            return movies;
        }
        return availableMovies;
    }

    async delete(id: string): Promise<Movies> {
        const rentals = await prismaClient.rental.deleteMany({where: {movie_id: id}});
        const movie = await prismaClient.movies.delete({where: {id}});
        return movie;
    }
}