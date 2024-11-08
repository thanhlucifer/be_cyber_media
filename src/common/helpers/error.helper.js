import { responseError } from "./response.helper.js";


export class BadRequestError extends Error {
    constructor(message = `BadRequestError`) {
        super(message);
        this.code = 400;
    }
}


export const handlerError = (err, req, res, next) => {
    console.log(`Loi o cuoi cung`,err);
    const resData = responseError(`Có lỗi xảy ra`, err.code, err.stack)
    res.status(resData.code).json(resData);
 }