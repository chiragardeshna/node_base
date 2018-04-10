import * as express from "express";
import {Request, Response} from "express";

let router = express.Router();

router.get('/contact', (req, res, next) => {
    res.json({message: "contact us page"});
});

export default router;