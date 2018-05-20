import {check, validationResult} from "express-validator/check";
import unique from "../../../../../../vendor/Nterprise/Http/Request/Validaton/unique";
import Role from "../../Models/role";

export default [
    check('name')
        .isLength({min: 1}).withMessage("Name is required")
        .custom((value) => unique(value, Role, "name")).withMessage("Role already exists")
        .isAlpha().withMessage('Name must be alpha')
    ,
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash("errors", errors.array({onlyFirstError: true}));
            req.flash("input", req.body);
            return res.redirect("/admin/roles/create");
        }
        next();
    }
]