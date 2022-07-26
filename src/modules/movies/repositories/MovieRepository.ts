import { Movies } from "@prisma/client";
import prismaClient from "../../../prisma";
import { CreateMovieDTO } from "../dtos/CreateMovieDTO";
import { IMovieRepository } from "./interfaces/IMovieRepository";


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

    async findByName(name: string): Promise<Movies> {
        const movie = await prismaClient.movies.findFirst({where: {name}});
        return movie as Movies;
    }
}