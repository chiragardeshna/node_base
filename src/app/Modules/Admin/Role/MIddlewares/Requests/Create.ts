import {isEmpty} from "lodash";
export default (req, res, next) => {
    req.checkBody('name', "Name is required").exists();
    req.checkBody('name', "Name must be at lease 3 characters.").len({min: 3});
    req.checkBody('description', 'Description is required').exists();
    let errors = req.validationErrors();
    if (!isEmpty(errors)) {
        req.flash("errors", errors);
        return res.redirect("/admin/roles/create");
    }
    next();
};