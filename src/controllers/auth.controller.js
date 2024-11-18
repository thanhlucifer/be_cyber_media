import { responseSuccess } from "../common/helpers/response.helper.js";
import authService from "../services/auth.service.js";

const authController = {
    register: async (request, respone, next) => {
        try {
            const result = await authService.register(request)
            const resData = responseSuccess(result, `Dang ky thanh cong`)
            respone.status(resData.code).json(resData);
        } catch (error) {
            next(error)

        }
    },

    login : async (request, respone, next) => {
        try {
            const result = await authService.login(request)
            const resData = responseSuccess(result, `Dang nhap thanh cong`)
            respone.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },

    loginFacebook : async (request, respone, next) => {
        try {
            const result = await authService.loginFacebook(request)
            const resData = responseSuccess(result, `Dang nhap facebook thanh cong`)
            respone.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },

    refreshToken : async (request, respone, next) => {
        try {
            const result = await authService.refreshToken(request)
            const resData = responseSuccess(result, `Refresh token thanh cong`)
            respone.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    }
};

export default authController