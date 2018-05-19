import Application from "../../Container/Application";
import {ServiceProvider as ContractServiceProvider} from "../../Contracts/ServiceProvider";
import * as csrf from "csurf";

class ServiceProvider implements ContractServiceProvider {

    public app: Application;

    public async register(app: Application) {

        let config = app.getConfig()['security']['csrf'];
        Object.assign(config, {cookie: false});

        app.express.use(csrf(config));

        // middleware.
        app.express.use((req, res, next) => {
            res.locals.csrfToken = req.csrfToken();
            next();
        });

        return app;
    }
}

export default new ServiceProvider();

