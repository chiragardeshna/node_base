import {Request as ExpressRequest} from "express";

export default class Request {

    protected request: ExpressRequest;

    constructor(request) {
        this.request = request;
    }

    public get(name?: string): any {
        let params = Object.assign(this.request.body, this.request.query);
        if (name) return (typeof params[name] === "undefined") ? null : params[name];
        return params;
    }

    public session(key: string | Object = null) {
        if (key === null) return this.request.session;
        if (typeof key === "string") return this.request.session[key] ? this.request.session[key] : null;
        this.request.session = Object.assign(this.request.session, key);
        return;
    }

    public getExpressRequest() {
        return this.request;
    }
}