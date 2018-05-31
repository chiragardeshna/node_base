import {Renderer, Field} from "./Renderer";

export default class Template implements Renderer {

    protected template;

    constructor(template: string) {
        this.template = template;
    }

    public render(formField: Field) {

        let error = formField.getError();
        let errorClass = (!error)
            ? ''
            : (error["className"] || '').replace(new RegExp(" ", 'g'), ".");

        if (errorClass.length > 0) errorClass = "." + errorClass;

        let field = formField.output();

        return this.template.replace('{{field}}', field).replace('{{errorClass}}', errorClass);
    }
}