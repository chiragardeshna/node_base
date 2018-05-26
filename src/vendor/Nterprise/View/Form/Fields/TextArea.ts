import FormField from "./FormField";

export default class TextArea extends FormField {

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
        return `textarea#${id}.${classes}(name="${this.name}" ${otherAttributes}) ${this.value}`;
    }
}