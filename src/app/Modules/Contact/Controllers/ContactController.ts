import {Request, Response} from "express";
import {inject, injectable} from "inversify";
import Controller from "../../../../vendor/Nterprise/Http/Controller";

@injectable()
class ContactController extends Controller {

    protected request: Request;

    protected response: Response;

    protected repo;

    constructor(@inject("MODEL_CONTACT") repo) {
        super();
        this.repo = repo;
    }

    index() {
        this.response.send({page: "Contact Page"});
    }
}

export default ContactController;