import Application from "../Container/Application";
import {ServiceProvider as ContractServiceProvider} from "../Contracts/ServiceProvider";
import flashServiceProvider from "./Flash/ServiceProvider";
import * as session from "express-session";
import {Mongoose} from "mongoose";
import * as connectMongo from "connect-mongo";

class ServiceProvider implements ContractServiceProvider {

    public app: Application;

    public async register(app: Application) {

        let config = app.getConfig()['session'];
        let container = app.getContainer();

        let store = config['store']['default'];
        let storeOptions = config['store'][store];

        if (store === "mongo") {

            let mongoose = container.get<Mongoose>("DB_CONNECTION");
            let MongoStore = connectMongo(session);
            let mongoStore = new MongoStore(Object.assign(
                {mongooseConnection: mongoose.connection}, storeOptions
            ));

            config = Object.assign(config, {store: mongoStore});
            app.express.use(session(config));

            app = await flashServiceProvider.register(app);
        }

        return app;
    }
}

export default new ServiceProvider();

