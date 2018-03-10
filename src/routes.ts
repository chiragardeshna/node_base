import * as express from "express";
import app from "./app";

let router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: "This is test message"});
});

router.get('/users', (req, res, next) => {
    let controller = app.get("UserController");
    return controller.collection();
});

router.post('/users', (req, res, next) => {
    let controller = app.get("UserController");
    return controller.store();
});

export default router;