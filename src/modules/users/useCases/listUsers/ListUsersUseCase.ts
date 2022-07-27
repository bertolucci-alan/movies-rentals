import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

@injectable()
export class ListUsersUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute(user_id: string): Promise<User[]> {
        const user = await this.userRepository.findById(user_id);
        if(!user.isAdmin) throw new AppError("User is not admin", 401);

        const users = await this.userRepository.findAll();
        return users;
    }
}