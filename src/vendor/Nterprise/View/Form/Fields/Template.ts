import {Renderer, Field} from "./Renderer";
import {render} from "pug";

export default class Template implements Renderer {

    protected template;

    constructor(template: string) {
        this.template = template;
    }

    public render(formField: Field, html: boolean = false) {

        let error = formField.getError();
        let errorClass = (!error)
            ? ''
            : (error["className"] || '').replace(new RegExp(" ", 'g'), ".");

        if (errorClass.length > 0) errorClass = "." + errorClass;

        let field = formField.output();

        let template = this.template.replace('{{field}}', field).replace('{{errorClass}}', errorClass);

        return (html) ? render(template) : template;
    }
}