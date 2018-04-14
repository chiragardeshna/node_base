import {Response} from "express";

export default (response: Response) => {
    let code = 404;
    return response.status(code).json({
        code: code
    });
}