import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import {Mongoose} from "mongoose";
import {dirname} from "path";

import dbConfig from "../config/database";
import moduleConfig from "../config/module";
import sessionConfig from "../config/session";

import {MongoConnector} from "./Services/Database/MongoConnector";

const MongoStore = require('connect-mongo')(session);

class App {

    public config;

    public express: express.Express;

    public mongoose: Mongoose;

    constructor(config) {

        this.config = config;

        this.express = express();

        this.database().then((mongoose) => {
            this.mongoose = mongoose;
            this.middleware();
            this.registerModules();

            console.log(this.express);
        });
    }

    private middleware(): void {

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));

        this.express.use(express.static(dirname(__dirname) + "/public/assets"));
        this.express.set("views", dirname(__dirname) + "/public/views");
        this.express.set("view engine", "pug");

        // Session Store
        let sessionConfig = this.config["session"];
        if (typeof sessionConfig !== "undefined") {
            let store = new MongoStore({mongooseConnection: this.mongoose.connection});
            this.express.use(session(
                Object.assign(sessionConfig, {store: store})
            ));
        }
    }

    private registerModules() {
        let modules = this.config.modules;
        if (typeof modules === "undefined" || !modules instanceof Array) return;

        modules.forEach((module) => {
            new module().register(this);
        });
    }

    private async database(): Promise<Mongoose> {
        let mongoose = null;
        try {
            let connector = new MongoConnector;
            let dbConfig = this.config["mongodb"];
            mongoose = await connector.connect(dbConfig);
        } catch (e) {
            console.log(e);
        }
        return mongoose;
    }
}

let config = dbConfig;
Object.assign(dbConfig, moduleConfig, sessionConfig);

export default new App(config);
