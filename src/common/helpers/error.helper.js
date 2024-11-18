import pkg from 'jsonwebtoken';
const { TokenExpiredError, JsonWebTokenError } = pkg;
import { responseError } from "./response.helper.js";


export class BadRequestError extends Error {
    constructor(message = `BadRequestError`) {
        super(message);
        this.code = 400;
    }
}


export const handlerError = (err, req, res, next) => {
    console.log(`Loi o cuoi cung`, err);
    if (err instanceof JsonWebTokenError) err.code = 401
    if (err instanceof TokenExpiredError) err.code = 403


    const resData = responseError(`Có lỗi xảy ra`, err.code, err.stack)
    res.status(resData.code).json(resData);
}

export class ForbiddenError extends Error {
    constructor(message = `ForbiddenError`) {
        super(message);
        this.code = 403;
    }
}

export class UnauthorizedError extends Error {
    constructor(message = `UnauthorizedError`) {
        super(message);
        this.code = 401;
    }
}