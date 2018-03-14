import * as express from "express";
import app from "./app";
// Middleware
import UserRegistration from "./Middlewares/Requests/UserRegistration";

let router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: "This is test message"});
});

router.get('/users', (req, res, next) => {
    let controller = app.get("UserController");
    return controller.collection();
});

router.post('/users', [ UserRegistration ], (req, res, next) => {
    let controller = app.get("UserController");
    return controller.store();
});

export default router;