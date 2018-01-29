import * as express from "express";
// Controllers.
import UserController from "./Controllers/UserController";
// Models.
import User from "./Models/User";

let router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: "This is test message"});
});

router.get('/users', (req, res, next) => {
    let controller = (new UserController(new User())).boot(req, res);
    return controller.collection();
});

router.post('/users', (req, res, next) => {
    let controller = (new UserController(new User())).boot(req, res);
    return controller.store();
});

export default router;