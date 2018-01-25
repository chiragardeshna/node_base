import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import router from "./routes";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes(): void {
        this.express.use('/', router);
    }
}

export default (new App()).express;