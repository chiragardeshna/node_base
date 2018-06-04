import {find} from "lodash";
import {render} from "pug";
import Template from "./Fields/Template";
import TextField from "./Fields/TextField";
import Password from "./Fields/Password";
import TextArea from "./Fields/TextArea";
import Select from "./Fields/SelectField";
import Radio from "./Fields/Radio";
import Checkbox from "./Fields/CheckBox";
import CSRFField from "./Fields/CSRF";

export default (config) => {

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
                return field.render();
            },

            text: function (name: string, value: any = "", attributes: Object = {}) {
                let field = new TextField().setName(name).setValue(value).setAttributes(attributes);
                if (this.input(name)) field.setValue(this.input(name));
                return field.render();
            },

            password: function (name: string, attributes: Object = {}) {
                return new Password().setName(name).setAttributes(attributes).render();
            },

            textArea: function (name: string, value: any = "", attributes: Object = {}) {
                let field = new TextArea().setName(name).setValue(value).setAttributes(attributes);
                if (this.input(name)) field.setValue(this.input(name));
                return field.render();
            },

            select: function (name: string,
                              options: string | number[], value: any = "",
                              attributes: Object = {}) {
                let field = new Select().setName(name).setOptions(options).setValue(value).setAttributes(attributes);
                if (this.input(name)) field.setValue(!(this.input(name) instanceof Array) ? [this.input(name)] : this.input(name));
                return field.render();
            },

            radio: function (name: string, option: any, value: any = '', attributes: Object = {}) {
                let field = new Radio().setName(name).setOption(option).setValue(value).setAttributes(attributes);
                if (this.input(name) !== null) field.setValue(this.input(name) == option);
                return field.render();
            },

            checkbox: function (name: string, option: any, value: any = '', attributes: Object = {}) {
                let field = new Checkbox().setName(name).setOption(option).setValue(value).setAttributes(attributes);
                if (this.lastInput.length > 0) field.setValue(this.input(name) == option);
                return field.render();
            },

            error: function (name: string, template: string = '') {
                if (!this.hasError(name)) return '';
                if (!template) template = 'span.error {{error}}';
                let error = this.getError(name);
                return render(template.replace('{{error}}', error));
            },

            label: function (id: string, name: string, template: string = '') {
                if (!template) template = 'label.form-label(for="{{id}}") {{label}}';
                return render(template.replace('{{label}}', name).replace('{{id}}', id));
            }
        };

        next();
    }
};
