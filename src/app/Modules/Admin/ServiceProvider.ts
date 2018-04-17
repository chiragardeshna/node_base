import Application from "../../../vendor/Nterprise/Container/Application";
// Auth Module.
import authIoc from "./Auth/ioc";
import authRouter from "./Auth/router";

import {ServiceProvider as ContractServiceProvider} from "../../../vendor/Nterprise/Contracts/ServiceProvider";

class ServiceProvider implements ContractServiceProvider {

    public async register(app: Application) {

        // IOC Container.
        authIoc(app);

        // Route Bindings.
        app.express.use('/admin/auth', authRouter(app));

        // View Dir Bindings.
        app.express.set("views", __dirname + "/Auth/views");

        return app;
    }
}

export default new ServiceProvider();
