import * as express from "express";
import ContactController from "./Controllers/ContactController";
import Application from "../../../vendor/Nterprise/Container/Application";

export default (app: Application) => {

    let router = express.Router();
    let container = app.getContainer();

    router.get('/', (req, res, next) => {
        let controller = container.get<ContactController>("CONTROLLER_CONTACT");
        controller._boot(req, res);
        return controller.index();
    });

    return router;
}

