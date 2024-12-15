
import { BadRequestError } from "../common/helpers/error.helper.js";
import { prisma } from "../common/prisma/init.prisma.js";

export const userService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      let { page, limit } = req.query
      page = +page > 0 ? +page : 1
      limit = +limit > 0 ? +limit : 10
      const totalItems = await prisma.users.count()
      const totalPages = Math.ceil(totalItems / limit)

      const users = await prisma.users.findMany({
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
         items: users || [],
      }
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} user`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} user`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} user`;
   },

   uploadAvatar: async (req) => {
      const file = req.file
      if (!file) throw new BadRequestError('khong co file trong req')
      const isImgLocal = req.user.avatar?.includes(`local`)
      
      await prisma.users.update({
         where: {
            user_id: +req.user.user_id
         },
         data: {
            avatar: file.filename,
         }
      })

      return {
         folder: `images/`,
         filename: file.filename,
         imgUrl: isImgLocal ? `images${file.path}` : file.path
      }
   }
};