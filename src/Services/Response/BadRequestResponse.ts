import {Validator} from "validatorjs";
import {Response} from "express";

export default (response: Response, validator: Validator<any>) => {
    let code = 400;
    return response.status(code).json({
        code: code,
        errors: validator.errors.all()
    });
}