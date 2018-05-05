import * as express from "express";
import DashboardController from "./Controllers/DashboardController";
import Application from "../../../../vendor/Nterprise/Container/Application";
import Authenticated from "../Auth/Middlewares/Authenticated";

export default (app: Application) => {

    let router = express.Router();

    router.get('/', Authenticated, (req, res, next) => {
        let controller = new DashboardController();
        controller._boot(req, res);
        return controller.index();
    });

    return router;
}

