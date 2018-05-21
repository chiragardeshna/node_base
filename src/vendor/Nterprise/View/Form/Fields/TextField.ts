import FormField from "./FormField";

export default class TextField extends FormField {

    public render() {
        let field = this.field();
        let errorClass = (!this.error) ? '' : this.classNamesFromString(this.error["className"] || '');
        if (errorClass.length > 0) errorClass = "." + errorClass;
        let template = this.template || this.defaultTemplate();
        return template.replace('{{field}}', field).replace('{{errorClass}}', errorClass);
    }

    public field() {
        if (!this.name) throw "Name can not be empty.";
        let id = this.id();
        let classes = this.classes();
        let otherAttributes = this.otherAttributes();
        return `input#${id}.${classes}(type="text" name="${this.name}" value="${this.value}" ${otherAttributes})
        label.form-label ${this.label}`;
    }
}