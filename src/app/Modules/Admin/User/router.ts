import * as express from "express";

import Application from "../../../../vendor/Nterprise/Container/Application";
import UserController from "./Controllers/UserController";
import Authenticated from "../Auth/Middlewares/Authenticated";
import CreateUserRequest from './MIddlewares/Requests/Create';

export default (app: Application) => {

    let router = express.Router();
    let container = app.getContainer();
    router.use(Authenticated);

    router.get('/', (req, res, next) => {
        let controller = container.get<UserController>("CONTROLLER_USER");
        controller._boot(req, res);
        return controller.index();
    });

    router.post('/', CreateUserRequest, (req, res, next) => {
        let controller = container.get<UserController>("CONTROLLER_USER");
        controller._boot(req, res);
        return controller.store();
    });

    router.get('/create', (req, res, next) => {
        let controller = container.get<UserController>("CONTROLLER_USER");
        controller._boot(req, res);
        return controller.create();
    });

    router.get('/:id/edit', (req, res, next) => {
        let controller = container.get<UserController>("CONTROLLER_USER");
        controller._boot(req, res);
        return controller.edit(req.params.id);
    });

    return router;
}