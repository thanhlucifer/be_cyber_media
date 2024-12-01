import { ForbiddenError } from "../helpers/error.helper.js";
import { prisma } from "../prisma/init.prisma.js";

const checkPermission = async (req, res, next) => {
    try {
        const routePath = req.route.path
        const baseUrl = req.baseUrl
        const method = req.method
        const user = req.user
        const roleId = req.user.role_id
        const fullPath = `${baseUrl}${routePath}`
        if (roleId === 1) {
            next()
            return
        }

        const role_permissions_exists = await prisma.role_permissions.findFirst({
            where: {
                permissions: {
                    endpoint: fullPath,
                    method: method
                },
                role_id: roleId,
                is_active: true
            }
        })

        if (!role_permissions_exists) throw new ForbiddenError(`User doesn't have permission to access ${fullPath}`);
        
        next()
    } catch (error) {
        next(error)
    }
}

export default checkPermission