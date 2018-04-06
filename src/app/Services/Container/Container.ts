class Container {

    static TYPE = {SINGLETON: "singleton"};

    protected registry: Object = {};

    public register(name: string, callback: Function, type: string = "concrete") {
        this.registry[name] = {callback: callback, type: type, resolved: null};
    }

    public make(name: string) {

        let entry = this.registry[name];

        if (typeof entry === "undefined") throw "Object is not registered. Use Container.register() to register object.";

        let resolved = entry["resolved"];

        if (entry.type === Container.TYPE.SINGLETON && entry["resolved"] !== null) return resolved;

        resolved = this.registry[name]["resolved"] = entry.callback();

        return resolved;
    }
}

export default Container;