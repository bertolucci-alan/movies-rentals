import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMovieDTO {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsNumber()
    daily_rate!: number;

    @IsNotEmpty()
    @IsNumber()
    fine_amount!: number;

    available!: boolean;

    @IsNotEmpty()
    @IsString()
    genre_id!: string;
}