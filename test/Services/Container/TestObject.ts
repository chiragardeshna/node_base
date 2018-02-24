class TestObject {
    public arg: number;

    constructor(arg: number) {
        this.arg = arg;
    }

    public getName() {
        return this.arg;
    }
}

export default TestObject;