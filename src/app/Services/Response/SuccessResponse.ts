import {Response} from "express";

export default (response: Response, data: Object) => {
    let code = 200;
    return response.status(code).json({
        code: code,
        data: data
    });
}