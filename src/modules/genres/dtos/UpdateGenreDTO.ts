import { IsNotEmpty, IsString } from "class-validator";

export class UpdateGenreDTO {
    @IsNotEmpty()
    @IsString()
    name!: string
}