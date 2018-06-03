export interface Field {
    setName(name: string): Field;
    setLabel(label: string)
    setValue(value: any)
    setError(error: any)
    getError(): Object;
    getLabel(): string;
    setAttributes(attribute: Object)
    output(): string;
}

export interface Select extends Field {
    setOptions(options: string | number[]): Select
}

export interface CheckBox extends Field {
    setOption(option: string | number): CheckBox
}

export interface Radio extends Field {
    setOption(option: string | number): Radio
}

export interface Renderer {
    static render(template: string): string;
}