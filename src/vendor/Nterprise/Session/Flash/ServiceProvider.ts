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
            res.locals.successMessage = req.flash("success") || null;
            res.locals.lastInput = req.flash("input") || {};

            res.locals.input = (name) => {
                let input = res.locals.lastInput;
                if (!(input.length > 0)) return null;
                if (input instanceof Array) input = input[0];
                return (typeof input[name] !== "undefined") ? input[name] : null;
            };
            res.locals.hasError = (name: string) => {
                let errors = res.locals.errors;
                return find(errors, {param: name}) || null;
            };
            res.locals.getError = (name: string) => {
                let errors = res.locals.errors;
                let error = find(errors, {param: name}) || {};
                return error.msg || "";
            };

            next();
        });

        return app;
    }
}

export default new ServiceProvider();

