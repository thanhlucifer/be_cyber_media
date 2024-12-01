import { prisma } from "../common/prisma/init.prisma.js";
import _ from "lodash";

export const permissionService = {
    create: async function (req) {
        const { name, endpoint, method, module } = req.body

        const newPermission = await prisma.permissions.create({
            data: {
                name,
                endpoint,
                method,
                module
            }
        })

        return newPermission;
    },

    findAll: async function (req) {
        let { page, limit } = req.query
        page = +page > 0 ? +page : 1
        limit = +limit > 0 ? +limit : 1
        const totalItems = await prisma.permissions.count()
        const totalPages = Math.ceil(totalItems / limit)

        const permissions = await prisma.permissions.findMany({
            take: limit,
            skip: (page - 1) * limit,

            orderBy: {
                created_at: 'desc'

            }
        })

        return {
            page: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: totalPages,
            items: permissions || [],
        }
    },

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} permission`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} permission`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} permission`;
    },
    groupByModule: async (req) => {
        const roleId = +req.params.id
        const permissions = await prisma.permissions.findMany({
            include: {
                role_permissions:{
                    where: {
                        role_id: roleId,
                        is_active: true
                    }
                }
            }
        })
        return _.groupBy(permissions, 'module');
    }
};