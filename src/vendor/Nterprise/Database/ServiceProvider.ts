import {MongoConnector} from "./MongoConnector";
import {Mongoose} from "mongoose";
import Application from "../Container/Application";
import {ServiceProvider as ContractServiceProvider} from "../Contracts/ServiceProvider";

class ServiceProvider implements ContractServiceProvider {

    connector: MongoConnector;

    constructor(connector: MongoConnector) {
        this.connector = connector;
    }

    public async register(app: Application) {

        let config = ServiceProvider.config(app.config);
        let mongoose: Mongoose = await this.database(config);

        let container = app.getContainer();
        container.bind("DB_CONNECTION").toConstantValue(mongoose);
        app.setContainer(container);

        return app;
    }

    private async database(config): Promise<Mongoose> {
        let mongoose = null;
        try {
            mongoose = await this.connector.connect(config);
        } catch (e) {
            console.log(e);
        }
        return mongoose;
    }

    private static config(config) {
        return (typeof config["db"] !== "undefined" && typeof config["db"]["mongodb"] !== "undefined")
            ? config["db"]["mongodb"]
            : {};
    }
}

export default new ServiceProvider(new MongoConnector());