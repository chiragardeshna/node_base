import {find} from "lodash";
import Template from "./Fields/Template";
import TextField from "./Fields/TextField";
import TextArea from "./Fields/TextArea";
import Select from "./Fields/SelectField";
import Radio from "./Fields/Radio";
import Checkbox from "./Fields/CheckBox";
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
                let field = new CSRFField().setName('_csrf').setValue(res.locals.csrfToken);
                return new Template('{{field}}').render(field, true);
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
            },

            select: function (name: string,
                              options: string | number[], value: any = "",
                              label: string = "", attributes: Object = {}) {
                let field = new Select().setName(name).setOptions(options).setValue(value).setLabel(label).setAttributes(attributes);
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});
                if (this.input(name)) field.setValue(!(this.input(name) instanceof Array) ? [this.input(name)] : this.input(name));
                return template.render(field, true);
            },

            radio: function (name: string, option: any, value: any = '', label: string = '', attributes: Object = {}) {
                let field = new Radio().setName(name).setOption(option).setValue(value).setLabel(label).setAttributes(attributes);
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});
                if (this.input(name) !== null) field.setValue(this.input(name) == option);
                return new Template('{{field}}').render(field, true);
            },

            checkbox: function (name: string, option: any, value: any = '', label: string = '', attributes: Object = {}) {
                let field = new Checkbox().setName(name).setOption(option).setValue(value).setLabel(label).setAttributes(attributes);
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});
                if (this.lastInput.length > 0) field.setValue(this.input(name) == option);
                return new Template('{{field}}').render(field, true);
            }

        };

        next();
    }
};
