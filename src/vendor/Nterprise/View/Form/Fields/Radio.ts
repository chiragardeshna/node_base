import FormField from "./FormField";
import {Radio as IRadio} from "./Renderer";
import {PUG_SPACE, NEW_LINE} from "../../Constants";

export default class Radio extends FormField implements IRadio {

    protected option;

    public setOption(option) {
        this.option = option;
        return this;
    }

    public id() {
        let attributes = this.attributes || {};
        return attributes["id"] || (this.name.toLowerCase() + "_" + this.option.toString().replace(new RegExp(" ", "g"), "_"));
    }

    public classes() {
        let attributes = this.attributes || {};
        let classes = this.classNamesFromString(attributes["class"] || "");
        if (!(classes.length > 0)) classes = "with-gap.radio-col-teal";
        return classes;
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

        return `input#${id}.${classes}(type="radio" name="${this.name}" value="${this.option || ''}" ${checked} ${otherAttributes})`;
    }
}