import {Request, Response} from "express";
import {injectable} from "inversify";
import IController from "../Contracts/Http/Controller";

@injectable()
class Controller implements IController {

    protected request: Request;

    protected response: Response;

    _boot(request, response) {
        this.request = request;
        this.response = response;
        return this;
    }
}

export default Controller;