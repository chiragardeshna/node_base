import {renderFile, resol} from "pug";
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

        app.express.engine(".cpug", this.customEngine);

        app.express.set('view engine', ".cpug");

        /*let engine = app.express.get('view');

         console.log(Object.getOwnPropertyNames(engine.prototype));

         console.log(engine.prototype.resolve(__dirname + "/Theme/Views", "_login_layout.pug"));*/

        // Assets Dir Bindings.
        app.express.use("/admin-assets", serveStatic(__dirname + "/Theme/assets"));

        return app;
    }

    customEngine(path, options, fn) {
        let load = require('pug-load');

        if (options.compileDebug == undefined && process.env.NODE_ENV === 'production') {
            options.compileDebug = false;
        }

        let plugins = [
            {
                resolve: (filename, source, options) => {
                    console.log(filename + " requrested from source " + source);
                    filename = "/app/Modules/Admin/Theme/Views/theme/_login_layout.cpug";
                    options.basedir = "D:/websites/node_base/dist";
                    return load.resolve(filename, source, options);
                }
            }
        ];
        options.plugins = plugins;

        renderFile(path, options, fn);
    }

}

export default new ServiceProvider();
