export default abstract class FormField {

    protected name;
    protected template;
    protected label;
    protected value;
    protected error;
    protected attributes;

    public setName(name) {
        if (typeof name !== "string") throw "Name must be string.";
        this.name = name;
        return this;
    }

    public setLabel(label) {
        this.label = label;
        return this;
    }

    public setValue(value) {
        if (typeof value !== "string") throw "Value must be string.";
        this.value = value;
        return this;
    }

    public setError(error) {
        this.error = error;
        return this;
    }

    public setTemplate(template) {
        if (typeof template !== "string") throw "Template must be string.";
        this.template = template;
        return this;
    }

    public defaultTemplate() {
        return `.form-group.form-float
    .form-line{{errorClass}}
        {{field}}`;
    }

    public setAttributes(attributes) {
        if (typeof attributes !== "object") throw "Attributes must be object.";
        this.attributes = attributes;
        return this;
    }

    public id() {
        let attributes = this.attributes || {};
        return attributes["id"] || this.name.toLowerCase();
    }

    public classes() {
        let attributes = this.attributes || {};
        let classes = this.classNamesFromString(attributes["className"] || "");
        if (!(classes.length > 0)) classes = "form-control";
        return classes;
    }

    public classNamesFromString(str) {
        return str.replace(new RegExp(" ", 'g'), ".");
    }

    public otherAttributes() {
        let attributeString = "";

        for (let key in this.attributes) {
            if (!this.attributes.hasOwnProperty(key)) continue;
            if (["id", 'className'].indexOf(key) !== -1) continue;
            attributeString += key + '="' + this.attributes[key] + '" ';
        }

        return attributeString;
    }

    public abstract render();
}