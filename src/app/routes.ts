import * as express from "express";
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

router.get('/admin/auth', (req, res, next) => {
    let controller: AuthController = app.get("AuthController");
    return controller.login();
});

router.post('/admin/auth', (req, res, next) => {
    console.log(app.get("request").referrer());
    let controller: AuthController = app.get("AuthController");
    return controller.attempt();
});

router.get('/users/index', (req, res, next) => {
    let controller: UserController = app.get("UserController");
    return controller.index();
});

router.get('/users', (req, res, next) => {
    let controller: UserController = app.get("UserController");
    return controller.collection();
});

router.post('/users', [UserRegistration], (req, res, next) => {
    let controller: UserController = app.get("UserController");
    return controller.store();
});

router.post('/auth', (req, res, next) => {
    let controller: AuthController = app.get("AuthController");
    return controller.login();
});

export default router;