import { Genre } from "@prisma/client";
import prismaClient from "../../../prisma";
import { CreateGenreDTO } from "../dtos/CreateGenreDTO";
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

    async findByName(name: string): Promise<Genre> {
        const genre = await prismaClient.genre.findFirst({where: {name}});
        return genre as Genre;
    }
}