
import { prisma } from "../common/prisma/init.prisma.js";

const videoService = {
    listVideo: async (request) => {

        let { page, limit } = request.query
        page = +page > 0 ? +page : 1
        limit = +limit > 0 ? +limit : 1
        const totalItems = await prisma.videos.count()
        const totalPages = Math.ceil(totalItems / limit)
        
        const videos = await prisma.videos.findMany({
            take: limit,
            skip: (page - 1) * limit,

            orderBy:{
                created_at: 'desc'

            }
        })
        
        return {
            page: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: totalPages,
            items: videos || [],
        }
    },

    listVideoType: async () => {

        const result = await prisma.video_type.findMany()


        return result
    }
}


export default videoService