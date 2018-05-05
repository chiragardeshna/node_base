import * as express from "express";
import AuthController from "./Controllers/AuthController";
import Application from "../../../../vendor/Nterprise/Container/Application";
import Guest from "./Middlewares/Guest";

export default (app: Application) => {

    let router = express.Router();
    let container = app.getContainer();

    router.get('/', Guest, (req, res, next) => {
        let controller = container.get<AuthController>("CONTROLLER_AUTH");
        controller._boot(req, res);
        return controller.login();
    });

    router.post('/', Guest, (req, res, next) => {
        let controller = container.get<AuthController>("CONTROLLER_AUTH");
        controller._boot(req, res);
        return controller.attempt();
    });

    router.post('/logout', (req, res, next) => {
        let controller = container.get<AuthController>("CONTROLLER_AUTH");
        controller._boot(req, res);
        return controller.logout();
    });

    return router;
}

