import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;

}