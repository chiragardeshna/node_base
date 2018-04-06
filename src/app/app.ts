import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./routes";
import config from "./Config/Database";

import {MongoConnector} from "./Services/Database/MongoConnector";
import {Mongoose} from "mongoose";
import Container from "./Services/Container/Container";

import * as session from "express-session";
import sessionConfig from "./Config/Session";
import Request from "./Services/Request/Request";
import DIController from "./DI/DIController";
import DIBusinessLogic from "./DI/DIBusinessLogic";
import {dirname} from "path";

const MongoStore = require('connect-mongo')(session);

class App {

    public express: express.Express;

    public connection: Mongoose;

    public container: Container;

    constructor() {

        this.express = express();

        this.container = new Container();

        Promise.all([this.database()]).then(() => {
            this.register();
            this.middleware();
            this.routes();
        });
    }

    private middleware(): void {

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));

        console.log(dirname(__dirname));

        this.express.use(express.static(dirname(__dirname)  + "/public/assets"));
        this.express.set("views", dirname(__dirname) + "/public/views");
        this.express.set("view engine", "pug");

        let store = new MongoStore({mongooseConnection: this.get("connection").connection});
        this.express.use(session(
            Object.assign(sessionConfig, {store: store})
        ));
    }

    private routes(): void {
        this.express.use('/', router);
    }

    private register() {
        this.container.register("express", () => this.express);
        this.container.register("connection", () => this.connection);
        this.express.use(function (req, res, next) {
            this.container.register("request", () => new Request(req));
            this.container.register("response", () => res);
            this.container.register("next", () => next);
            this.container = DIBusinessLogic(this).container;
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