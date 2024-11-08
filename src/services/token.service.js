import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET } from "../common/constants/app.constants.js";


const tokenService = {
    createTokens: (userExists) => {
        const accessToken = jwt.sign({
            user_id: userExists.user_id
        }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES })

        const refreshToken = jwt.sign({
            user_id: userExists.user_id
        }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES })


        return { accessToken, refreshToken }
    }
};

export default tokenService