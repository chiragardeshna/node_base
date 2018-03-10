import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./routes";
import config from "./Config/Database";
import {MongoConnector} from "./Services/Database/MongoConnector";
import {Mongoose} from "mongoose";
import Container from "./Services/Container/Container";


import Request from "./Services/Request/Request";
import DIController from "./DI/DIController";

class App {

    public express: express.Express;

    public connection: Mongoose;

    public container: Container;

    constructor() {

        this.express = express();

        this.container = new Container();

        this.register();

        Promise.all([this.database()]).then(() => {
            this.middleware();
            this.routes();
        });
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));
    }

    private routes(): void {
        this.express.use('/', router);
    }

    private register() {
        this.container.register("express", () => this.express);
        this.container.register("db", () => this.connection);
        this.express.use(function (req, res, next) {
            this.container.register("request", () => new Request(req));
            this.container.register("response", () => res);
            this.container.register("next", () => next);
            this.container = DIController(this).container;
            next();
        }.bind(this));
    }

    private async database(): Promise<Mongoose> {
        try {
            let connector = new MongoConnector;
            this.connection = await connector.connect(config["mongodb"]);
        } catch (e) {
            console.log(e);
        }
        return this.connection;
    }

    public get(name: string): any {
        return this.container.make(name);
    }
}

export default new App();