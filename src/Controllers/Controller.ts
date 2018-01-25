import {Request, Response} from "express";

class Controller {

    protected request: Request;

    protected response: Response;

    public boot(request: Request, response: Response) {
        this.request = request;
        this.response = response;
        return this;
    }
}

export default Controller;