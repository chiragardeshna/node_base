import Application from "../../../vendor/Nterprise/Container/Application";

// IOC
import authIoc from "./Auth/ioc";
import roleIoc from "./Role/ioc";
import userIoc from "./User/ioc";

// Routers
import authRouter from "./Auth/router";
import dashboardRouter from "./Dashboard/routes";
import roleRouter from "./Role/router";
import userRouter from "./User/router";

import {ServiceProvider as ContractServiceProvider} from "../../../vendor/Nterprise/Contracts/ServiceProvider";
import serveStatic = require("serve-static");
import * as expressValidator from "express-validator";

class ServiceProvider implements ContractServiceProvider {

    public async register(app: Application) {

        // Register Validator
        app.express.use(expressValidator({}));

        // IOC Container.
        authIoc(app);
        roleIoc(app);
        userIoc(app);

        // Route Bindings.
        app.express.use('/admin/auth', authRouter(app));
        app.express.use('/admin/dashboard', dashboardRouter(app));
        app.express.use('/admin/roles', roleRouter(app));
        app.express.use('/admin/users', userRouter(app));

        // View Dir Bindings.
        let viewDirs = [
            __dirname + "/Theme/Views",
            __dirname + "/Auth/Views",
            __dirname + "/Dashboard/Views",
            __dirname + "/Role/Views",
            __dirname + "/User/Views",
        ];
        app.express.set("views", viewDirs);

        // Assets Dir Bindings.
        app.express.use("/admin-assets", serveStatic(__dirname + "/Theme/assets"));

        return app;
    }
}

export default new ServiceProvider();
