import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRentalDTO {
    @IsNotEmpty()
    @IsString()
    movie_id!: string;

    start_date?: Date;

    end_date?: Date;

    @IsNotEmpty()
    @IsDateString()
    expect_return_date!: Date

    total?: number
}