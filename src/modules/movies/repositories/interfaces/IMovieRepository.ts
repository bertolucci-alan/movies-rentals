import { Movies } from "@prisma/client";
import { Session } from "../../../../shared/types/Session";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";
import { UpdateMovieDTO } from "../../dtos/UpdateMovieDTO";

export interface IMovieRepository {
    create(body: CreateMovieDTO): Promise<Movies>;
    update(body: UpdateMovieDTO, id: string): Promise<Movies>;
    findByName(name: string): Promise<Movies>;
    findById(id: string): Promise<Movies>;
    findAll({name, genre_id}: IRequestFindAllMovie): Promise<Movies[]>;
    delete(id: string): Promise<Movies>;
}

export interface IRequestFindAllMovie {
    name?: string;
    genre_id?: string
}