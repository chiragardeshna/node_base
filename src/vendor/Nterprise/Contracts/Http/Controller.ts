import {Request, Response} from "express";

export default interface Controller {
    _boot(request: Request, response: Response);
}