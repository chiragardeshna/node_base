import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./routes";
import config from "./Config/Database";
import {MongoConnector} from "./Services/Database/MongoConnector";
import {Mongoose} from "mongoose";

class App {

    public express: express.Application;

    public connection: Mongoose;

    constructor() {
        this.express = express();
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

    private async database(): Promise<Mongoose> {
        try {
            let connector = new MongoConnector;
            this.connection = await connector.connect(config["mongodb"]);
        } catch (e) {
            console.log(e);
        }
        return this.connection;
    }
}

export default (new App()).express;