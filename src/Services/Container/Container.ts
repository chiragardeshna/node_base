class Container {

    protected registry: Object = {};

    public register(name: string, callback: Function, type?: string) {
        this.registry[name] = {callback: callback, type: type, resolved: null};
    }

    public make(name: string) {

        let entry = this.registry[name];

        if (typeof entry === "undefined") throw "Object is not registered. Use Container.register() to register object.";

        console.log(entry.callback);

        return entry.callback();
    }
}

export default new Container();