import jwt from "jsonwebtoken";
import { prisma } from "../prisma/init.prisma.js";
import { ForbiddenError, UnauthorizedError } from "../helpers/error.helper.js";

const protect = async (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization?.split(' ')[1]
        if (!accessToken) throw new UnauthorizedError(`Missing access token`)

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        //console.log(decoded)

        const user = await prisma.users.findUnique({
            where: {
                user_id: decoded.user_id
            },
            select: {
                roles: true,
                user_id: true,
                email: true,
                avatar: true,
                full_name: true
            }
        })

        if (!user) throw new ForbiddenError()

        req.user = user
        next();
    } catch (error) {
        next(error)
    }
}

export default protect