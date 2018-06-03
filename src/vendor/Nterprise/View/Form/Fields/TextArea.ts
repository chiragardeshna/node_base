import FormField from "./FormField";

export default class TextArea extends FormField {

    public output() {
        if (!this.name) throw "Name can not be empty.";

        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];

        let template = `textarea#${id}.${classes}(name="${this.name}" ${otherAttributes})`;
        if (this.value) template += `  ${this.value}`;

        return template;
    }
}