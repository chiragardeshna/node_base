class TestObject {
    public arg: number;

    constructor(arg: string) {
        this.arg = Math.random();
    }

    public getName() {
        return this.arg;
    }
}

export default TestObject;