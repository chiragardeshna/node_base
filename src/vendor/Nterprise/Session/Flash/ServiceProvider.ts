import Application from "../../Container/Application";
import {ServiceProvider as ContractServiceProvider} from "../../Contracts/ServiceProvider";
import * as flash from "connect-flash";

class ServiceProvider implements ContractServiceProvider {

    public app: Application;

    public async register(app: Application) {

        // flash
        app.express.use(flash());

        return app;
    }
}

export default new ServiceProvider();

