import {Request, Response} from "express";

class ContactController {

    protected request: Request;

    protected response: Response;

    constructor() {

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