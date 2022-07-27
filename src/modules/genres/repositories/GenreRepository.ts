import { Genre } from "@prisma/client";
import prismaClient from "../../../prisma";
import { CreateGenreDTO } from "../dtos/CreateGenreDTO";
import { UpdateGenreDTO } from "../dtos/UpdateGenreDTO";
import { IGenreRepository } from "./interfaces/IGenreRepository";


export class GenreRepository implements IGenreRepository {
    async create({name}: CreateGenreDTO): Promise<Genre> {
        const genre = await prismaClient.genre.create({
            data: {
                name
            }
        });
        return genre;
    }

    async update({ name }: UpdateGenreDTO, id: string): Promise<Genre> {
        const genre = await prismaClient.genre.update({where: {id}, data:{name}});
        return genre;
    }

    async findByName(name: string): Promise<Genre> {
        const genre = await prismaClient.genre.findFirst({where: {name}});
        return genre as Genre;
    }

    async findById(id: string): Promise<Genre> {
        const genre = await prismaClient.genre.findFirst({where: {id}});
        return genre as Genre;
    }

    async findAll(): Promise<Genre[]> {
        const genres = await prismaClient.genre.findMany();
        return genres;
    }

    async delete(id: string): Promise<Genre> {
        const movies = await prismaClient.movies.findMany({where: {genre_id: id}});
        for (const movie of movies) {
            await prismaClient.rental.deleteMany({where: {movie_id: movie.id}});
        }
        await prismaClient.movies.deleteMany({where: {genre_id: id}});
        const genre = await prismaClient.genre.delete({where: {id}});
        return genre;
    }
}