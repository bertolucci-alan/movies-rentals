import { Express } from "express";
import { useExpressServer, RoutingControllersOptions } from "routing-controllers";
import path from 'path';

import { currentUserChecker } from "../shared/middlewares/currentUserChecker";
import { authorizationChecker } from "../shared/middlewares/authorizationChecker";

//criando configurações de rotas
export const routes = (app: Express): Express => {
    const options: RoutingControllersOptions = {
        routePrefix: "/api",
        defaultErrorHandler: false,
        authorizationChecker,
        currentUserChecker,
        controllers: [
            path.join(__dirname, '..', '/modules/**/controllers/*{.ts,.js}' ),
        ],
        middlewares: [
            path.join(__dirname, '..', '/shared/middlewares/*{.ts,.js}'),
        ],
    };
    useExpressServer(app, options);
    return app;
}
