import {check, validationResult} from "express-validator/check";
import unique from "../../../../../../vendor/Nterprise/Http/Request/Validaton/unique";
import User from "../../user";

export default [

    // first name
    check('firstName').isLength({min: 1, max: 30}).withMessage("First Name is required"),
    // last name
    check('lastName').isLength({min: 1, max: 30}).withMessage("Last Name is required"),
    // email
    check('email').isLength({min: 1, max: 50}).withMessage("Email is required")
        .custom((value) => unique(value, User, "email")).withMessage("User with this email address already exists"),
    // password
    check('password').isLength({min: 1, max: 12}).withMessage("Password is required"),

    // validation result
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("errors", errors.array({onlyFirstError: true}));
            req.flash("input", req.body);
            return res.redirect("/admin/users/create");
        }
        next();
    }
]