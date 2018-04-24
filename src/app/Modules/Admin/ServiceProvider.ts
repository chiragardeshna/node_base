import {renderFile} from "pug";
import Application from "../../../vendor/Nterprise/Container/Application";
// Auth Module.
import authIoc from "./Auth/ioc";
import authRouter from "./Auth/router";

import {ServiceProvider as ContractServiceProvider} from "../../../vendor/Nterprise/Contracts/ServiceProvider";
import serveStatic = require("serve-static");

class ServiceProvider implements ContractServiceProvider {

    public async register(app: Application) {

        // IOC Container.
        authIoc(app);

        // Route Bindings.
        app.express.use('/admin/auth', authRouter(app));

        // View Dir Bindings.
        let viewDirs = [
            __dirname + "/Theme/Views",
            __dirname + "/Auth/Views",
        ];
        app.express.set("views", viewDirs);

        // Assets Dir Bindings.
        app.express.use("/admin-assets", serveStatic(__dirname + "/Theme/assets"));

        return app;
    }
}

export default new ServiceProvider();
