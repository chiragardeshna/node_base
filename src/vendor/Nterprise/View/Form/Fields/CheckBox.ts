import FormField from "./FormField";
import {CheckBox as ICheckBox} from "./Renderer";
import {PUG_SPACE, NEW_LINE} from "../../Constants";

export default class CheckBox extends FormField implements ICheckBox {

    protected defaultClass = "with-gap.radio-col-teal";
    protected option;

    public setOption(option): ICheckBox {
        this.option = option;
        return this;
    }

    public id() {
        let attributes = this.attributes || {};
        return attributes["id"] || (this.name.toLowerCase() + "_" + this.option.toString().replace(new RegExp(" ", "g"), "_"));
    }

    public setValue(value) {
        if (typeof value !== "boolean") throw "Value must be boolean.";
        this.value = value;
        return this;
    }

    public output() {
        if (!this.name) throw "Name can not be empty.";

        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];
        let checked = (this.value) ? 'checked="checked"' : '';

        return `input#${id}.${classes}(type="checkbox" name="${this.name}" value="${this.option || ''}" ${checked} ${otherAttributes})`;
    }
}