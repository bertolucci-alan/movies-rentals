import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { UpdateUserDTO } from "../../dtos/UpdateUserDTO";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

@injectable()
export class UpdateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute(body: UpdateUserDTO, id: string): Promise<User> {
        const userExists = await this.userRepository.findById(id);
        if(!userExists) throw new AppError("User does not exists!", 404);

        if(body.email) {
            const userEmailAlreadyExists = await this.userRepository.findByEmail(body.email);
            if(userEmailAlreadyExists && userExists.email !== body.email) {
                throw new AppError(
                    "User with the same email already exists", 409
                );
            }
        }
        
        if(body.password) body.password = await hash(body.password, 8);

        const user = await this.userRepository.update(body, id);
        return user;
    }
}