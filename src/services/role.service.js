import { prisma } from "../common/prisma/init.prisma.js";

export const roleService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      let { page, limit } = req.query
      page = +page > 0 ? +page : 1
      limit = +limit > 0 ? +limit : 1
      const totalItems = await prisma.roles.count()
      const totalPages = Math.ceil(totalItems / limit)

      const roles = await prisma.roles.findMany({
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
         items: roles || [],
      }
   },

   findOne: async function (req) {
      const role = await prisma.roles.findUnique(
         {
            where: {
               role_id: +req.params.id
            }
         }
      );
      return role;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} role`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} role`;
   },

   togglePermission: async (req) => {
      const { permission_id, role_id } = req.body

     const role_permissions_exists = await prisma.role_permissions.findFirst({
         where: {
            permission_id: permission_id,
            role_id: role_id,
         },
      })

      if (role_permissions_exists) {
         await prisma.role_permissions.update({
            where: {
              role_permissions_id: role_permissions_exists.role_permissions_id
            },
            data: {
               is_active: !role_permissions_exists.is_active
            }
         })
      } else {
         await prisma.role_permissions.create({
            data: {
              permission_id: permission_id,
              role_id: role_id,
              is_active: true
            }
         })
      }
      return `ok `
   }
};