import { Body, JsonController, Post } from "routing-controllers";
import { container } from "tsyringe";
import { AuthenticateUserDTO } from "../dtos/AuthenticateUserDTO";
import { AuthenticateUserUseCase, IAuthenticateUser } from "../useCases/authenticateUser/AuthenticateUserUseCase";

@JsonController("/auth")
export class AuthController {
    @Post("/")
    async auth(@Body() body: AuthenticateUserDTO): Promise<IAuthenticateUser> {
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
        return await authenticateUserUseCase.execute(body);
    }
}