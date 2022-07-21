import { container } from "tsyringe";
import { IUserRepository } from "../../modules/users/repositories/interfaces/IUserRepository";
import { UserRepository } from "../../modules/users/repositories/UserRepository";

//registrando singletons para injeção de repositório em usecases

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);