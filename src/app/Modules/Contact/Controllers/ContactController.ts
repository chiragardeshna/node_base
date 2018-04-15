import {Request, Response} from "express";
import {inject, injectable} from "inversify";

@injectable()
class ContactController {

    protected request: Request;

    protected response: Response;

    protected repo;

    constructor(@inject("MODEL_CONTACT") repo) {
        this.repo = repo;
    }

    _boot(request, response) {
        this.request = request;
        this.response = response;
    }

    index() {
        this.response.send({page: "Contact Page"});
    }
}

export default ContactController;