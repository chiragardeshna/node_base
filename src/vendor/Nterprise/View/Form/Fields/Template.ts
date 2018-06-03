import {Renderer, Field} from "./Renderer";
import {render} from "pug";

export default class Template {

    protected template;

    constructor(template: string) {
        this.template = template;
    }

    public field(formField: Field) {
        let error = formField.getError();
        let errorClass = (!error)
            ? ''
            : (error["class"] || '').replace(new RegExp(" ", 'g'), ".");

        if (errorClass.length > 0) errorClass = "." + errorClass;

        let field = formField.output();

        return this.template.replace('{{field}}', field).replace('{{errorClass}}', errorClass);
    }

    public static render(template: string) {
        return render(template);
    }
}