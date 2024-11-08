
import videoService from "../services/video.service.js"

import { responseSuccess } from "../common/helpers/response.helper.js";
import { responseError } from "../common/helpers/response.helper.js";
const videoController = {
    listVideo: async (request, respone, next) => {
        try {
            const result = await videoService.listVideo(request)
            const resData = responseSuccess(result, `Lấy danh sách video thành công`)
            respone.status(resData.code).json(resData);
        } catch (error) {
            next(error)

        }



    },

    listVideoType: async (request, respone, next) => {
        try {
            const result = await videoService.listVideoType(request)
            const resData = responseSuccess(result, `Lấy loại video thành công`)
            respone.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }

    }

}

export default videoController