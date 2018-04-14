import * as express from "express";

let router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: "contact us page"});
});

export default router;
