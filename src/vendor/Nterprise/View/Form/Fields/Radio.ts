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
        return attributes["id"] || (this.name.toLowerCase() + "_" + this.option.replace(new RegExp(" ", "g"), "_"));
    }

    public classes() {
        let attributes = this.attributes || {};
        let classes = this.classNamesFromString(attributes["className"] || "");
        if (!(classes.length > 0)) classes = "with-gap.radio-col-teal";
        return classes;
    }
  
    public output() {
        if (!this.name) throw "Name can not be empty.";

        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];
        let checked = (this.option == this.value) ? 'checked="checked"' : '';

        let template = `input#${id}.${classes}(type="radio" name="${this.name}" value="${this.option || ''}" ${checked} ${otherAttributes})`;
        if (this.label) template += `${NEW_LINE}${PUG_SPACE.repeat(2)}label.form-label(for="${id}") ${this.label}`;

        return template;
    }
}