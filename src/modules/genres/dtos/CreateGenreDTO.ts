import { IsNotEmpty, IsString } from "class-validator";


export class CreateGenreDTO {
    @IsNotEmpty()
    @IsString()
    name!: string;
}