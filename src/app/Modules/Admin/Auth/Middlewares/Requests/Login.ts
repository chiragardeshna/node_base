import {check, validationResult} from "express-validator/check";
export default [
    check('username').isEmail().withMessage("Username must be valid email address"),
    check('password').isLength({min: 1}).withMessage('Password is required'),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("errors", errors.array());
            res.redirect("/admin/auth");
        }
        next();
    }
]