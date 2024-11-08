import { BadRequestError } from "../common/helpers/error.helper.js";
import { prisma } from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenService from "./token.service.js";

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
    }

}
export default authService