import { Rental } from "@prisma/client";
import prismaClient from "../../../prisma";
import { CreateRentalDTO } from "../dtos/CreateRentalDTO";
import { IRentalRepository } from "./interfaces/IRentalRepository";


export class RentalRepository implements IRentalRepository {
    async create({
        movie_id, start_date, end_date, expect_return_date, total
    }: CreateRentalDTO, user_id: string): Promise<Rental> {
        const rental = await prismaClient.rental.create({
            data: {
                user_id,
                movie_id,
                start_date, 
                end_date, 
                expect_return_date, 
                total
            }
        });
        return rental
    }

    async findUserOpenRental(user_id: string): Promise<Rental> {
        const userOpenRental = await prismaClient.rental.findFirst({where: {
            user_id,
            end_date: null
        }});
        return userOpenRental as Rental;
    }
}