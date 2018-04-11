import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
const MongoStore = require('connect-mongo')(session);
import {Mongoose} from "mongoose";
import {dirname} from "path";
import _ from "lodash";

// Config
import router from "./routes";

import dbConfig from "./Config/Database";
import moduleConfig from "./Config/Module";
import sessionConfig from "./Config/Session";

import {MongoConnector} from "./Services/Database/MongoConnector";

import Request from "./Services/Request/Request";
import DIController from "./DI/DIController";
import DIBusinessLogic from "./DI/DIBusinessLogic";

class App {

    public config: [];

    public express: express.Express;

    public mongoose: Mongoose;

    constructor(config) {

        this.config = config;

        this.express = express();

        this.database().then((mongoose) => {
            this.mongoose = mongoose;
            this.middleware();
            this.routes();
            this.registerModules();

            console.log(this.express);
        });
    }

    private middleware(): void {

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));

        this.express.use(express.static(dirname(__dirname)  + "/public/assets"));
        this.express.set("views", dirname(__dirname) + "/public/views");
        this.express.set("view engine", "pug");

        // Session Store
        let sessionConfig = this.config["session"];
        if(typeof sessionConfig !== "undefined"){
          let store = new MongoStore({mongooseConnection: this.mongoose.connection});
          this.express.use(session(
              Object.assign(sessionConfig, {store: store})
          ));
        }
    }

    private routes(): void {
        this.express.use('/', router);
    }

    private registerModules(){
       let modules = this.config.modules;
       if(typeof modules === "undefined" || !modules instanceof Array) return;

       modules.forEach((module) => {
         this.express = new module().register(this.express);
       });
    }

    private async database(): Promise<Mongoose> {
        let mongoose = null
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

console.log(config);

export default new App(config);
