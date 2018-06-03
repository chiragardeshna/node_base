import {find} from "lodash";
import Template from "./Fields/Template";
import TextField from "./Fields/TextField";
import TextArea from "./Fields/TextArea";
import Select from "./Fields/SelectField";
import Radio from "./Fields/Radio";
import Checkbox from "./Fields/CheckBox";
import CSRFField from "./Fields/CSRF";

export default (config) => {

    let defaultTemplate = new Template(config.template || '');

    let textTemplate = (!config.text) ? defaultTemplate : new Template(config.text);

    let textAreaTemplate = (!config.textArea) ? defaultTemplate : new Template(config.textArea.template);

    let selectTemplate = (!config.select) ? defaultTemplate : new Template(config.select.template);

    let radioTemplate = (!config.radio) ? defaultTemplate : new Template(config.radio.template);

    let checkboxTemplate = (!config.checkbox) ? defaultTemplate : new Template(config.checkbox.template);

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
                return Template.render(field.output());
            },

            text: function (name: string, value: any = "", label: string = "", attributes: Object = {}) {
                let field = new TextField().setName(name).setValue(value).setLabel(label).setAttributes(attributes);

                // TODO: Remove hardcoded error class and give it as configurable option.
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});

                if (this.input(name)) field.setValue(this.input(name));

                return Template.render(textTemplate.field(field), true);
            },

            textArea: function (name: string, value: any = "", label: string = "", attributes: Object = {}) {
                let field = new TextArea().setName(name).setValue(value).setLabel(label).setAttributes(attributes);
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});
                if (this.input(name)) field.setValue(this.input(name));
                return Template.render(textAreaTemplate.field(field), true);
            },

            select: function (name: string,
                              options: string | number[], value: any = "",
                              label: string = "", attributes: Object = {}) {
                let field = new Select().setName(name).setOptions(options).setValue(value).setLabel(label).setAttributes(attributes);
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});
                if (this.input(name)) field.setValue(!(this.input(name) instanceof Array) ? [this.input(name)] : this.input(name));
                return Template.render(selectTemplate.field(field), true);
            },

            radio: function (name: string, option: any, value: any = '', label: string = '', attributes: Object = {}) {
                let field = new Radio().setName(name).setOption(option).setValue(value).setLabel(label).setAttributes(attributes);
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});
                if (this.input(name) !== null) field.setValue(this.input(name) == option);
                return Template.render(radioTemplate.field(field));
            },

            checkbox: function (name: string, option: any, value: any = '', label: string = '', attributes: Object = {}) {
                let field = new Checkbox().setName(name).setOption(option).setValue(value).setLabel(label).setAttributes(attributes);
                if (this.hasError(name)) field.setError({'class': 'error', message: this.getError(name)});
                if (this.lastInput.length > 0) field.setValue(this.input(name) == option);
                return Template.render(checkboxTemplate.field(field), true);
            },

            error: function (name: string) {
                if (!this.hasError(name)) return '';
                let error = this.getError(name);
                return Template.render(config.error.replace('{{error}}', error));
            },

            label: function (name: string, id: string) {
                let label = config.label.replace('{{label}}', name).replace('{{id}}', id);
                return Template.render(label);
            }
        };

        next();
    }
};
