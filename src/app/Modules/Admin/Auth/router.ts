import * as express from "express";
import AuthController from "./Controllers/AuthController";
import Application from "../../../../vendor/Nterprise/Container/Application";

export default (app: Application) => {

    let router = express.Router();
    let container = app.getContainer();

    router.get('/', (req, res, next) => {
        let controller = container.get<AuthController>("CONTROLLER_AUTH");
        controller._boot(req, res);
        return controller.login();
    });

    router.post('/', (req, res, next) => {
        let controller = container.get<AuthController>("CONTROLLER_AUTH");
        controller._boot(req, res);
        return controller.attempt();
    });

    return router;
}

