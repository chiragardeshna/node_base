import * as express from "express";

import Application from "../../../../vendor/Nterprise/Container/Application";
import RoleController from "./Controllers/RoleController";
import Authenticated from "../Auth/Middlewares/Authenticated";
import CreateRoleRequest from "./MIddlewares/Requests/Create";

export default (app: Application) => {

    let router = express.Router();
    let container = app.getContainer();
    router.use(Authenticated);

    router.get('/', (req, res, next) => {
        let controller = container.get<RoleController>("CONTROLLER_ROLE");
        controller._boot(req, res);
        return controller.index();
    });

    router.post('/', CreateRoleRequest, (req, res, next) => {
        let controller = container.get<RoleController>("CONTROLLER_ROLE");
        controller._boot(req, res);
        return controller.store();
    });

    router.get('/create', (req, res, next) => {
        let controller = container.get<RoleController>("CONTROLLER_ROLE");
        controller._boot(req, res);
        return controller.create();
    });

    router.get('/:id/edit', (req, res, next) => {
        let controller = container.get<RoleController>("CONTROLLER_ROLE");
        controller._boot(req, res);
        return controller.edit(req.params.id);
    });

    return router;
}