import Application from "../../Container/Application";
import {ServiceProvider as ContractServiceProvider} from "../../Contracts/ServiceProvider";
import FormHelper from "./Helper";

class ServiceProvider implements ContractServiceProvider {

    public app: Application;

    public async register(app: Application) {

        app.express.use(FormHelper({}));

        return app;
    }
}

export default new ServiceProvider();
