import express, {Express} from 'express';
import { routes } from './routes';

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
    }
}

export default routes(new App().app);