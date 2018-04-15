import Application from "../../../vendor/Nterprise/Container/Application";
import ioc from "./ioc";
import router from "./router";

class ServiceProvider {

    public register(app: Application) {

        ioc(app);

        app.express.use('/contact', router(app));

        return app;
    }
}

export default new ServiceProvider();
