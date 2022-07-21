import express, {Express} from 'express';
import { routes } from './routes';

import { Request, Response, NextFunction } from "express";
import { AppError } from "./shared/container/errors/AppError";

//iniciando app e uses
class App {
    public app: Express = express();

    constructor() {
        this.middleware();
    }

    private middleware(): void {
        this.app.use(express.json());
        this.app.use(
            express.urlencoded({extended: true})
        );
        //tratamento de erros
        this.app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
            //caso for uma instancia de AppError, retornar o err
            if(err instanceof AppError) return response.status(err.statusCode).json(err.message)
            //caso não, retornar erro interno
            return response.status(500).json({
                    status: "error",
                    message: `Internal server error. ${err}`
                })
        })
    }
}

export default routes(new App().app);