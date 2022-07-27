import { CreateGenreDTO } from "../../dtos/CreateGenreDTO";
import { Genre } from '@prisma/client';
import { UpdateGenreDTO } from "../../dtos/UpdateGenreDTO";

export interface IGenreRepository {
    create({name}: CreateGenreDTO): Promise<Genre>;
    update({name}: UpdateGenreDTO, id: string): Promise<Genre>;
    findByName(name: string): Promise<Genre>;
    findById(id: string): Promise<Genre>;
    findAll(): Promise<Genre[]>
}