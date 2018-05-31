import FormField from "./FormField";

export default class TextArea extends FormField  {

    public output() {
        if (!this.name) throw "Name can not be empty.";

        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];
        return `textarea#${id}.${classes}(name="${this.name}" ${otherAttributes}) ${this.value}`;
    }
}