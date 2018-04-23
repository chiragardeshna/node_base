import {ServiceProvider as ContractServiceProvider} from "../vendor/Nterprise/Contracts/ServiceProvider";
import Application from "../vendor/Nterprise/Container/Application";

class ServiceProvider implements ContractServiceProvider {

    public async register(app: Application) {

        let config = app.getConfig()["express"];

        // View engine.
        // app.express.set('view engine', config["view_engine"]);

        return app;
    }
}

export default new ServiceProvider();
