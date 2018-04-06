import {IUser} from "../../Interfaces/Entities/IUser";
import * as Validator from "validatorjs";
import {UserValidator} from "../../Validators/UserValidator";
import Request from "../../Services/Request/Request";
import BadRequestResponse from "../../Services/Response/BadRequestResponse";

export default (req, res, next) => {
    let data: IUser = new Request(req).get();
    let validation = new Validator(data, UserValidator.rules());
    if (validation.fails()) return BadRequestResponse(res, validation);
    next();
}