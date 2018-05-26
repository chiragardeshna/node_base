import TextField from "./TextField";

export default class CSRF extends TextField {

    public defaultTemplate() {
        return '{{field}}';
    }

    public field() {
        return `input(type="hidden" name="${this.name}" value="${this.value}")`;
    }
}