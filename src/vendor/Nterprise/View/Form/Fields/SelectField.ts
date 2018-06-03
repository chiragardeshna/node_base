import FormField from "./FormField";
import {Select as ISelect} from "./Renderer";
import {PUG_SPACE, NEW_LINE} from "../../Constants";

export default class SelectField extends FormField implements ISelect{

    protected options: { label: string, value: string | number | null }[];

    public setValue(value) {
        this.value = value;
        return this;
    }

    public setOptions(options) {
        if (!(options instanceof Array)) throw "Options must be array of name value pair.";
        this.options = options;
        return this;
    }

    public output() {
        if (!this.name) throw "Name can not be empty.";

        let [id, classes, otherAttributes] = [this.id(), this.classes(), this.otherAttributes()];

        let multiSelect = (this.attributes && (this.attributes['multiple'] || false));
        if (!(this.value instanceof Array) && multiSelect) throw "Value must be array.";

        let options = this.optionList(this.options, this.value);
        let optionTemplate = NEW_LINE + PUG_SPACE.repeat(3) + options.join(NEW_LINE + PUG_SPACE.repeat(3));

        return `select#${id}.${classes}(name="${this.name}" ${otherAttributes})${optionTemplate}`;
    }

    public optionList(options, value): string[] {
        let optionList: string[] = [];
        let values: string | number[];
        if (!(options instanceof Array)) return optionList;
        values = (!(value instanceof Array)) ? [value] : value;

        for (let option of options) {
            let selected = (values.indexOf(option.value) !== -1) ? ' selected="selected"' : '';
            let disabled = (option.disabled || false) ? ' disabled="disabled"' : '';
            optionList.push(`option(value="${option.value}"${selected}${disabled}) ${option.label}`);
        }

        return optionList;
    }
}