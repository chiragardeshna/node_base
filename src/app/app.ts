import * as express from "express";
import "reflect-metadata";
import {Container} from "inversify";
import Application from "../vendor/Nterprise/Container/Application";

// Load config files.
import expressConfig from "../config/express";
import dbConfig from "../config/database";
import moduleConfig from "../config/module";
import sessionConfig from "../config/session";
import securityConfig from "../config/security";
import formConfig from "../config/form";

let config = Object.assign(
    expressConfig,
    dbConfig,
    moduleConfig,
    sessionConfig,
    securityConfig,
    formConfig
);
let container = new Container();
let expressInstance = express();

let application = (new Application())
    .setConfig(config)
    .setContainer(container)
    .setExpressInstance(expressInstance);

application._boot();

export default application;
