import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient({
    omit: {
        users: {
            pass_word: true
        }
    }
});
