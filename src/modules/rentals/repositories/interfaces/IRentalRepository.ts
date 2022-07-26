import { Rental } from "@prisma/client";
import { CreateRentalDTO } from "../../dtos/CreateRentalDTO";

export interface IRentalRepository {
    create(body: CreateRentalDTO, user_id: string): Promise<Rental>;
    findUserOpenRental(user_id: string): Promise<Rental>;
}