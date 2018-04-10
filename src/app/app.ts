import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./routes";
import config from "./Config/Database";

import {MongoConnector} from "./Services/Database/MongoConnector";
import {Mongoose} from "mongoose";

import * as session from "express-session";
import sessionConfig from "./Config/Session";
import Request from "./Services/Request/Request";
import DIController from "./DI/DIController";
import DIBusinessLogic from "./DI/DIBusinessLogic";
import {dirname} from "path";

const MongoStore = require('connect-mongo')(session);

class App {

    public express: express.Express;

    public mongoose: Mongoose;

    constructor() {

        this.express = express();

        this.database().then((mongoose) => {
            this.mongoose = mongoose;
            this.middleware();
            this.routes();
        });
    }

    private middleware(): void {

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));

        this.express.use(express.static(dirname(__dirname)  + "/public/assets"));
        this.express.set("views", dirname(__dirname) + "/public/views");
        this.express.set("view engine", "pug");

        let store = new MongoStore({mongooseConnection: this.mongoose.connection});
        this.express.use(session(
            Object.assign(sessionConfig, {store: store})
        ));
    }

    private routes(): void {
        this.express.use('/', router);
    }

    private async database(): Promise<Mongoose> {
        let mongoose = null
        try {
            let connector = new MongoConnector;
            mongoose = await connector.connect(config["mongodb"]);
        } catch (e) {
            console.log(e);
        }
        return mongoose;
    }
}

export default new App();