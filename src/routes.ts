import * as express from "express";
import UserController from "./Controllers/UserController";

let router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ message: "This is test message" });
});

router.get('/users', (req, res, next) => {
    let controller = (new UserController()).boot(req, res);
    return controller.collection();
});

export default router;