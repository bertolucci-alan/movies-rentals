import "reflect-metadata";
import "express-async-errors";
import "./shared/container";

import app from './app';

//iniciando server
app.listen(3000, () => console.log("Server is running at http://localhost:3000"));