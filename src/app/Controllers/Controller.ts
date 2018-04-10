import {Request, Response} from "express";
import {injectable} from "inversify";

@injectable()
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