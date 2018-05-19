import {isEmpty} from "lodash";
export default (req, res, next) => {
    req.checkBody('username', "Username must be valid email address").isEmail();
    req.checkBody('password', "Password is required").exists();
    let errors = req.validationErrors();
    if (!isEmpty(errors)) {
        req.flash("errors", errors);
        res.redirect("/admin/auth");
    }
    next();
};