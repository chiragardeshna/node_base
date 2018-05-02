import {ServiceProvider as ContractServiceProvider} from "../vendor/Nterprise/Contracts/ServiceProvider";
import Application from "../vendor/Nterprise/Container/Application";
import * as bodyParser from "body-parser";

class ServiceProvider implements ContractServiceProvider {

    public async register(app: Application) {

        app.express.use(bodyParser.urlencoded({extended: true}));
        app.express.use(bodyParser.json());

        return app;
    }
}

export default new ServiceProvider();
