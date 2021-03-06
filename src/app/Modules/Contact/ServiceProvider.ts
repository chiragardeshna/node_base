import Application from "../../../vendor/Nterprise/Container/Application";
import ioc from "./ioc";
import router from "./router";
import {ServiceProvider as ContractServiceProvider} from "../../../vendor/Nterprise/Contracts/ServiceProvider";

class ServiceProvider implements ContractServiceProvider {

    public async register(app: Application) {

        ioc(app);

        app.express.use('/contact', router(app));

        return app;
    }
}

export default new ServiceProvider();
