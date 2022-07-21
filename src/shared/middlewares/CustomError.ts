import { ValidationError } from "class-validator";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { getReasonPhrase } from 'http-status-codes';
import { AppError } from "../errors/AppError";

//depois da requisição, esse middleware é chamado
@Middleware({type: 'after'})
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    public error(err: any, request: Request, response: any, next: (err?: any) => any): any {
        if(err?.errors?.every((err: any) => err instanceof ValidationError)) {
            const parsedError = err?.errors?.map((error: ValidationError) => {
                return this.parseValidationError(error);
            });
            const formatValidationError = this.formatValidationError(parsedError, err.httpCode);
            return response.status(err.httpCode).json(formatValidationError);
        }

        if(err instanceof AppError) {
            const parsedAppError = this.parseAppError(err);
            return response.status(err.statusCode).json(parsedAppError);
        }
    }

    formatValidationError(errors: ValidationError[], statusCode: number): any {
        return {
            name: getReasonPhrase(statusCode),
            status: statusCode,
            message: "Validation failed",
            errors: errors
        }
    }

    parseValidationError(err: ValidationError): any {
        return {
                property: err.property,
                receivedValue: err?.value,
                validations: Object.values(err?.constraints ?? {}),
        }
    }

    parseAppError(err: AppError) {
        return {
            name: getReasonPhrase(err.statusCode),
            status: err.statusCode,
            message: err.message,
        }
    }
}