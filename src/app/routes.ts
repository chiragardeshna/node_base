import * as express from "express";
import {Request, Response} from "express";
import {inject} from "inversify";
import {TYPES} from "./types";
import {container} from "./ioc";

// App
import app from "./app";

// Middleware
import UserRegistration from "./Middlewares/Requests/UserRegistration";
import AuthController from "./Controllers/Admin/AuthController";
import UserController from "./Controllers/UserController";

let router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.session["authenticated"]);
    res.json({message: "This is test message"});
});

router.get('/admin/auth', (req: Request, res: Response, next) => {
    let controller: AuthController = container.get(TYPES.CONTROLLER_AUTH);
    controller.boot(req, res);
    return controller.login();
});

router.post('/admin/auth', (req, res, next) => {
    let controller: AuthController = container.get(TYPES.CONTROLLER_AUTH);
    return controller.attempt();
});

router.get('/users/index', (req, res, next) => {
    let controller: UserController = container.get(TYPES.CONTROLLER_USER);
    return controller.index();
});

router.get('/users', (req, res, next) => {
    let controller: UserController = container.get(TYPES.CONTROLLER_USER);
    return controller.collection();
});

router.post('/users', [UserRegistration], (req, res, next) => {
    let controller: UserController = container.get(TYPES.CONTROLLER_USER);
    return controller.store();
});

router.post('/auth', (req, res, next) => {
    let controller: AuthController = container.get(TYPES.CONTROLLER_AUTH);
    return controller.login();
});

export default router;