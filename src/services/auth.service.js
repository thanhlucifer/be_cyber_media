import { BadRequestError, UnauthorizedError } from "../common/helpers/error.helper.js";
import { prisma } from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenService from "./token.service.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../common/constants/app.constants.js";
import { sendMail } from "../common/mail/send-mail.nodemailer.js";

const authService = {
    register: async (request) => {
        const { email, pass_word, full_name } = request.body;
        console.log({ email, pass_word, full_name });

        const userExists = await prisma.users.findFirst({
            where: {
                email
            }
        });

        if (userExists) throw new BadRequestError(`Email already exists.`);

        const hashedPassword = bcrypt.hashSync(pass_word, 10);

        const usernew = await prisma.users.create({
            data: {
                email,
                pass_word: hashedPassword,
                full_name
            }
        })

        await sendMail(email, full_name)

        return usernew;
    },

    login: async (request) => {
        const { email, pass_word } = request.body;
        console.log({ email, pass_word });

        const userExists = await prisma.users.findFirst({
            where: {
                email
            },

            select: {
                user_id: true,
                pass_word: true
            }

        });

        if (!userExists) throw new BadRequestError(`Email doesn't exist.`);

        const passHash = userExists.pass_word
        const isPasswordValid = bcrypt.compareSync(pass_word, passHash);
        if (!isPasswordValid) throw new BadRequestError(`Password is incorrect.`);

        const tokens =tokenService.createTokens(userExists);

        return tokens
    },

    loginFacebook: async (request) => {
        const { email, id, name, picture } = request.body;

        console.log({ email, id, name, picture });

        const userExists = await prisma.users.findFirst({
            where: {
                email
            },

            select: {
                user_id: true,
                pass_word: true,
                full_name: true,
                avatar: true
            }

        });
        
        
        if (userExists) {
           await prisma.users.update({
                where: {
                    user_id: userExists.user_id
                },
                data: {
                    full_name: userExists.full_name ? undefined : name,
                    avatar: userExists.avatar ? undefined : picture.data.url
    
                }
            })

        } else {
            await prisma.users.create({
                data: {
                    face_app_id : id,
                    full_name: name,
                    email: email,
                    avatar: picture.data.url        
                }
            })
        }

        const tokens =tokenService.createTokens(userExists);

        return tokens
    },

    refreshToken: async (request) => {
        console.log(request.headers)
        const refreshToken = request.headers?.authorization?.split(' ')[1]
        const accessToken = request.headers[`x-access-token`]

        if (!refreshToken || !accessToken) throw new UnauthorizedError()

        const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
        const decodedAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, { ignoreExpiration: true })

        if (decodedRefreshToken.user_id !== decodedAccessToken.user_id) throw new UnauthorizedError()
        
        const user = await prisma.users.findUnique({
            where: {
                user_id: decodedRefreshToken.user_id
            }
        })

        const tokens =tokenService.createTokens(user);

        return tokens

    },

    getInfo: async (request) => {

        return request.user
    }

}
export default authService