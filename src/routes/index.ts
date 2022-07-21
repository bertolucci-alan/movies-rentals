import { Express } from "express";
import { useExpressServer, RoutingControllersOptions } from "routing-controllers";
import path from 'path';

//criando configurações de rotas
export const routes = (app: Express): Express => {
    const options: RoutingControllersOptions = {
        routePrefix: "/api",
        defaultErrorHandler: false,
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
