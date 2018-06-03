import FormField from "./FormField";

export default class TextField extends FormField {

    public output() {
        if (!this.name) throw "Name can not be empty.";
        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];
        return `input#${id}.${classes}(type="text" name="${this.name}" value="${this.value}" ${otherAttributes})`;
    }
}