import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMovieDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    daily_rate?: number;

    @IsOptional()
    @IsNumber()
    fine_amount?: number;

    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsOptional()
    @IsString()
    genre_id?: string;
}