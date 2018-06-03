import { Field } from "./Renderer";
import {NEW_LINE} from "../../Constants";

export default abstract class FormField implements Field {

    protected name: string;
    protected label: string = '';
    protected value: any = '';
    protected error: { 'class': string, message: string };
    protected attributes;

    public setName(name): Field {
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

    public getError() {
        return this.error;
    }

    public getLabel(label) {
        if (!this.label) return '';
        return `${NEW_LINE}label.form-label(for="${this.id()}") ${this.label}`;
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
            if (["id", 'class'].indexOf(key) !== -1) continue;
            attributeString += key + '="' + this.attributes[key] + '" ';
        }

        return attributeString;
    }

    public abstract output(): string;
}