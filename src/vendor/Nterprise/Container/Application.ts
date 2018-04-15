import * as express from "express";
import "reflect-metadata";
import {Container} from "inversify";

export default class Application {

    public config;

    public container: Container;

    public express: express.Express;

    public getConfig(): Object {
        return this.config;
    }

    public setConfig(config) {
        this.config = config;
        return this;
    }

    public getContainer(): Container {
        return this.container;
    }

    public setContainer(container: Container) {
        this.container = container;
        return this;
    }

    public getExpressInstance(): express.Express {
        return this.express;
    }

    public setExpressInstance(express: express.Express) {
        this.express = express;
        return this;
    }

    public async _boot() {
        let modules = this.config.modules;
        if (typeof modules === "undefined" || !(modules instanceof Array)) return;

        let _this = this;
        for (let module of modules) {
            _this = await module.register(_this);
        }
    }
}