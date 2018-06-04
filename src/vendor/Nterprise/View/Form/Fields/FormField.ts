import {Field} from "./Renderer";
import {render} from "pug";

export default abstract class FormField implements Field {

    protected name: string;
    protected value: any = '';
    protected defaultClass = 'form-control';
    protected attributes;

    public setName(name): Field {
        if (typeof name !== "string") throw "Name must be string.";
        this.name = name;
        return this;
    }

    public setValue(value) {
        if (typeof value !== "string") throw "Value must be string.";
        this.value = value;
        return this;
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
        let classes = this.classNamesFromString(attributes["class"] || "");
        if (!(classes.length > 0)) classes = this.defaultClass;
        return classes;
    }

    public classNamesFromString(str) {
        return str.replace(new RegExp(" ", 'g'), ".");
    }

    public otherAttributes() {
        let attributeString = "";

        for (let key in this.attributes) {
            if (!this.attributes.hasOwnProperty(key)) continue;
            if (["id", 'class'].indexOf(key) !== -1) continue;
            attributeString += key + '="' + this.attributes[key] + '" ';
        }

        return attributeString;
    }

    public abstract output(): string;

    public render() {
        return render(this.output());
    }
}