import FormField from "./FormField";
import {PUG_SPACE, NEW_LINE} from "../../Constants";

export default class TextField extends FormField {

    public output() {
        if (!this.name) throw "Name can not be empty.";
        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];
        let template = `input#${id}.${classes}(type="text" name="${this.name}" value="${this.value}" ${otherAttributes})`;
        if (this.label) template += `${NEW_LINE}${PUG_SPACE.repeat(2)}label.form-label ${this.label}`;
        return template;
    }
}