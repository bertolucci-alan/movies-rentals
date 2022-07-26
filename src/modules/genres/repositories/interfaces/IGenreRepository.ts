import { CreateGenreDTO } from "../../dtos/CreateGenreDTO";
import { Genre } from '@prisma/client';

export interface IGenreRepository {
    create({name}: CreateGenreDTO): Promise<Genre>;
    findByName(name: string): Promise<Genre>;
    findById(id: string): Promise<Genre>;
    findAll(): Promise<Genre[]>
}