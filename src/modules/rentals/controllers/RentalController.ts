import { Rental } from "@prisma/client";
import { Body, CurrentUser, JsonController, Post } from "routing-controllers";
import { container } from "tsyringe";
import { Session } from "../../../shared/types/Session";
import { CreateRentalDTO } from "../dtos/CreateRentalDTO";
import { CreateRentalUseCase } from "../useCases/createRental/CreateRentalUseCase";

@JsonController("/rentals")
export class RentalController {
    @Post("/")
    async create(
        @Body() body: CreateRentalDTO,
        @CurrentUser() authUser: Session
    ): Promise<Rental> {
        const createRentalUseCase = container.resolve(CreateRentalUseCase);
        return await createRentalUseCase.execute(body, authUser.id);
    }
}