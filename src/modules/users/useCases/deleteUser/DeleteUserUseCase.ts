import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

@injectable()
export class DeleteUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.delete(id);
        return user;
    }
}