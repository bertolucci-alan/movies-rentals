import "reflect-metadata";
import "express-async-errors";
import "./shared/container";
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import { AppError } from "./shared/container/errors/AppError";

const app = express();
app.use(express.json());
app.use(routes);
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        //caso for uma instancia de AppError, retornar o erro
        if(err instanceof AppError) return response.status(err.statusCode).json(err.message);
        //caso não, retornar erro interno
        return response.status(500).json({
            status: "error",
            message: `Internal server error. ${err}`
        });
    } 
);

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));