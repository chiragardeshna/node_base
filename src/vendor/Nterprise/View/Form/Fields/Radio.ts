import FormField from "./FormField";

export default class Radio extends FormField {

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

    public defaultTemplate() {
        return '{{field}}';
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
        let checked = (this.option == this.value) ? 'checked="checked"' : '';

        let template = `input#${id}.${classes}(type="radio" name="${this.name}" value="${this.option || ''}" ${checked} ${otherAttributes})`;
        if (this.label) template += `${this.newLine}${this.tab.repeat(2)}label.form-label(for="${id}") ${this.label}`;

        return template;
    }
}