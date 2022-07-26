import { Movies } from "@prisma/client";
import { Session } from "../../../../shared/types/Session";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";

export interface IMovieRepository {
    create(body: CreateMovieDTO): Promise<Movies>;
    findByName(name: string): Promise<Movies>;
    findAll({name, genre_id}: IRequestFindAllMovie): Promise<Movies[]>;
}

export interface IRequestFindAllMovie {
    name?: string;
    genre_id?: string
}