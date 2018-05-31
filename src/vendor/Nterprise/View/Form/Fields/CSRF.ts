import TextField from "./TextField";

export default class CSRF extends TextField {

    public output() {
        return `input(type="hidden" name="${this.name}" value="${this.value}")`;
    }
}