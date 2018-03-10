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

    public getExpressRequest() {
        return this.request;
    }
}