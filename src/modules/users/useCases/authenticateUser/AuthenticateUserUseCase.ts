import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { AuthenticateUserDTO } from "../../dtos/AuthenticateUserDTO";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

export interface IAuthenticateUser {
    user: {
        name: string,
        email: string,
    }
    token: string
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepository
    ){}

    async execute({
        email, password
    }: AuthenticateUserDTO): Promise<IAuthenticateUser> {
        const user: User = await this.usersRepository.findByEmail(email);
        if(!user) throw new AppError("Incorrect password/email combination");

        const passwordMatch: boolean = await compare(password, user.password);

        if(!passwordMatch) throw new AppError("Incorrect password/email combination");

        const token: string = sign({id: user.id}, 'secret', {
            expiresIn: "1d"
        });

        const tokenResponse: IAuthenticateUser = {
            user: {
                name: user.name,
                email: user.email
            },
            token: token
        };

        return tokenResponse;
    }
}