import {Response} from "express";

export default (response: Response, data: Object) => {
    let code = 401;
    return response.status(code).json({
        code: code,
        data: data
    });
}