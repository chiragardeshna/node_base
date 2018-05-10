import Application from "../Container/Application";
import {find} from "lodash";
import {ServiceProvider as ContractServiceProvider} from "../Contracts/ServiceProvider";
import * as session from "express-session";
import {Mongoose} from "mongoose";
import * as connect from 'connect-mongo';
import * as csrf from "csurf";
import * as flash from "connect-flash";

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

                // flash
                app.express.use(flash());

                // csrf
                app.express.use(csrf({cookie: false}));

                // middleware.
                app.express.use((req, res, next) => {
                    res.locals.csrfToken = req.csrfToken();
                    res.locals.errors = req.flash("errors");
                    res.locals.hasError = (name: string) => {
                        let errors = res.locals.errors;
                        return find(errors, {param: name}) || null;
                    };
                    res.locals.getError = (name: string) => {
                        let errors = res.locals.errors;
                        let error = find(errors, {param: name}) || {};
                        console.log("herer", error);
                        return error.msg || "";
                    };
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

