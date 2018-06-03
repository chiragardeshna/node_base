import {find} from "lodash";
import Template from "./Fields/Template";
import TextField from "./Fields/TextField";
import TextArea from "./Fields/TextArea";
import CSRFField from "./Fields/CSRF";

export default (config) => {

    let template = new Template(config.template || '');

    return (req, res, next) => {

        res.locals.successMessage = req.flash("success") || null;

        res.locals.form = {

            errors: req.flash("errors") || [],

            lastInput: req.flash("input") || [],

            input: function (name) {
                let input: any[] = this.lastInput;
                if (!(input.length > 0)) return null;
                if (input instanceof Array) input = input[0];
                return (typeof input[name] !== "undefined") ? input[name] : null;
            },

            hasError: function (name: string) {
                let errors = this.errors;
                return find(errors, {param: name}) || null;
            },

            getError: function (name: string) {
                let errors = this.errors;
                let error = find(errors, {param: name}) || {};
                return error.msg || "";
            },

            csrfField: function () {
                // TODO: Remove hardcoded csrf token name and give it as configurable option.
                return template.render(new CSRFField().setName('_csrf').setValue(res.locals.csrfToken), true);
            },

            text: function (name: string, value: any = "", label: string = "", attributes: Object = {}) {
                let field = new TextField().setName(name).setValue(value).setLabel(label).setAttributes(attributes);

                // TODO: Remove hardcoded error class and give it as configurable option.
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});

                if (this.input(name)) field.setValue(this.input(name));
                return template.render(field, true);
            },

            textArea: function (name: string, value: any = "", label: string = "", attributes: Object = {}) {
                let field = new TextArea().setName(name).setValue(value).setLabel(label).setAttributes(attributes);

                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});

                if (this.input(name)) field.setValue(this.input(name));
                return template.render(field, true);
            }
        };

        next();
    }
};
