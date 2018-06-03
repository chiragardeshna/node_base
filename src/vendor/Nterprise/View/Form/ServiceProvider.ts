import Application from "../../Container/Application";
import {ServiceProvider as ContractServiceProvider} from "../../Contracts/ServiceProvider";
import FormHelper from "./Helper";

class ServiceProvider implements ContractServiceProvider {

    public app: Application;

    public async register(app: Application) {

        let config = app.getConfig()['field'];

        app.express.use(FormHelper(config));

        return app;
    }
}

export default new ServiceProvider();
