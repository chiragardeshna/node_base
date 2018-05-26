import FormField from "./FormField";

export default class SelectField extends FormField {

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

        let multiSelect = (this.attributes && (this.attributes['multiple'] || false));
        if (multiSelect && !this.value instanceof Array) throw "Value must be array.";

        let options = this.optionList(this.options, this.value);
        let optionTemplate = this.newLine + this.tab.repeat(3) + options.join(this.newLine + this.tab.repeat(3));

        let template = `select#${id}.${classes}(name="${this.name}" ${otherAttributes})${optionTemplate}`;
        if (this.label) template += `${this.tab.repeat(2)}label.form-label ${this.label}`;

        return template;
    }

    public optionList(options, value): string[] {
        let optionList: string[] = [];
        let values: string | number[];
        if (!(options instanceof Array)) return optionList;
        values = (!(value instanceof Array)) ? [value] : value;

        for (let option of options) {
            let selected = (values.indexOf(option.value) !== -1) ? ' selected="selected"' : '';
            optionList.push(`option(value="${option.value}"${selected}) ${option.label}`);
        }

        return optionList;
    }
}