import FormField from "./FormField";

export default class Password extends FormField {

    public output() {
        if (!this.name) throw "Name can not be empty.";
        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];
        return `input#${id}.${classes}(type="password" name="${this.name}" ${otherAttributes})`;
    }
}