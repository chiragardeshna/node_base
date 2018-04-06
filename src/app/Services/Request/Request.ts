import {Request as ExpressRequest} from "express";

export default class Request {

    protected request: ExpressRequest;

    protected port: number;

    constructor(request, port = 8080) {
        this.request = request;
        this.port = port;
        // return this.registerProxy();
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
        return true;
    }

    public fullUrl() {
        return this.request.protocol + "://" + this.request.hostname + ":" + this.port + this.request.originalUrl;
    }

    public referrer() {
        return this.request.get('Referrer');
    }

    public registerProxy() {
        return new Proxy(this, {
            get: (target, prop) => {
                if (typeof target[prop] !== "undefined") return target[prop] || target[prop]();
                return (typeof target["request"][prop] !== "undefined") ? target["request"][prop] || target["request"][prop]() : undefined;
            },
            set: (target, prop, value) => {
                console.log(value);
                /*if (typeof target[prop] !== "undefined") return target[prop] || target[prop]();
                return (typeof target["request"][prop] !== "undefined") ? target["request"][prop] || target["request"][prop]() : undefined;*/
                return false;
            }
        });
    }

    public getExpressRequest() {
        return this.request;
    }
}