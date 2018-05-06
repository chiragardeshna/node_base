import Application from "../Container/Application";
import {ServiceProvider as ContractServiceProvider} from "../Contracts/ServiceProvider";
import * as session from "express-session";
import {Mongoose} from "mongoose";
import * as connect from 'connect-mongo';
import * as csrf from "csurf";

class ServiceProvider implements ContractServiceProvider {

    public app: Application;

    public async register(app: Application) {

        let config = app.getConfig()['session'];
        let container = app.getContainer();

        let store = config['store']['default'];
        let storeOptions = config['store'][store];

        try {
            if (store === "mongo") {

                let mongoose = container.get<Mongoose>("DB_CONNECTION");
                let MongoStore = connect(session);
                let mongoStore = new MongoStore(Object.assign(
                    {mongooseConnection: mongoose.connection}, storeOptions
                ));

                config = Object.assign(config, {store: mongoStore});
                app.express.use(session(config));

                // csrf
                app.express.use(csrf({cookie: false}));
                app.express.use((req, res, next) => {
                    res.locals.csrfToken = req.csrfToken();
                    next();
                });
            }
        } catch (error) {
            console.log(error);
        }

        return app;
    }
}

export default new ServiceProvider();
