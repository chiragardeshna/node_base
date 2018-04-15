import * as express from "express";
import "reflect-metadata";
import {Container} from "inversify";
import Application from "../vendor/Nterprise/Container/Application";

// Load config files.
import dbConfig from "../config/database";
import moduleConfig from "../config/module";
import sessionConfig from "../config/session";

let config = Object.assign(dbConfig, moduleConfig, sessionConfig);
let container = new Container();
let expressInstance = express();

let application = (new Application())
    .setConfig(config)
    .setContainer(container)
    .setExpressInstance(expressInstance);

application._boot();

export default application;
