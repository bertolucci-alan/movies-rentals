import { verify } from "jsonwebtoken";
import { Action } from "routing-controllers";
import { AppError } from "../errors/AppError";

export function authorizationChecker(action: Action) {
    const header = action.request.headers.authorization;

    if(!header) throw new AppError("Token not present", 401);

    const [, token] = header.split(" ");

    try {
        verify(token, "secret");
        return true;
    } catch (err) {
        throw new AppError("Token invalid", 401);
    }
}