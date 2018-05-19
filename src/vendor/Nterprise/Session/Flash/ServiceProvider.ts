import Application from "../../Container/Application";
import {find} from "lodash";
import {ServiceProvider as ContractServiceProvider} from "../../Contracts/ServiceProvider";
import * as flash from "connect-flash";

class ServiceProvider implements ContractServiceProvider {

    public app: Application;

    public async register(app: Application) {

        // flash
        app.express.use(flash());

        // middleware.
        app.express.use((req, res, next) => {
            res.locals.errors = req.flash("errors") || [];
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

        return app;
    }
}

export default new ServiceProvider();

