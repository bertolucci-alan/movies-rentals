import { decode, verify } from "jsonwebtoken";
import { Action } from "routing-controllers";
import { AppError } from "../errors/AppError";
import { Session } from "../types/Session";
import { IToken } from "../types/Token";

export function currentUserChecker(action: Action): Session {
    const header = action.request.headers.authorization;

    if(!header) throw new AppError("Token not present", 401);

    const [, token] = header.split(" ");

    if(!token) throw new AppError("Token not present", 401);

    try {
        const user = decode(token) as IToken;
        return user;
    } catch(err) {
        throw new AppError("Token invalid", 401);
    }
}