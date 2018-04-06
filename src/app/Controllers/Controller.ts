import {Response} from "express";
import Request from "../Services/Request/Request";

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