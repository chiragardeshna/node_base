import FormField from "./FormField";

export default class TextField extends FormField {

    public render() {
        if (!this.name) throw "Name can not be empty.";
        let field = this.field();
        let errorClass = (!this.error) ? '' : this.classNamesFromString(this.error["className"] || '');
        if (errorClass.length > 0) errorClass = "." + errorClass;
        let template = this.template || this.defaultTemplate();
        return template.replace('{{field}}', field).replace('{{errorClass}}', errorClass);
    }

    public field() {
        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];
        return `input#${id}.${classes}(type="text" name="${this.name}" value="${this.value}" ${otherAttributes})
${this.tab.repeat(2)}label.form-label ${this.label}`;
    }
}