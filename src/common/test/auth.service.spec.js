import { describe, it, beforeEach, afterEach, jest, expect } from "@jest/globals";
import authService from "../../services/auth.service.js";
import { prisma } from "../prisma/init.prisma.js";



describe(`Register`, () => {
    beforeEach(() => {
        console.log(`chay truoc ham IT`)
        jest.spyOn(prisma.users, 'create')
    })
    describe(`authService.rigister`, () => {
        it(`Case 1: Truong hop dang ky thanh cong`, async () => {
            // throw new Error(`Function not implemented.`);
            // console.log(`ham IT case 1 chay`);
            await prisma.users.create.mockResolvedValue({
                user_id: 17,
                email: "test@gmail.com",
                full_name: "test",
                avatar: null,
                google_id: null,
                face_app_id: null,
                created_at: "2024-11-09T08:40:46.000Z",
                updated_at: "2024-11-09T08:40:46.000Z",
                role_id: 2
            });

            const userNew = await authService.register({
                body: {
                    email: `test@gmail.com`,
                    pass_word: `12345678`,
                    full_name: `test`
                }
            })
            console.log(userNew);

            expect(userNew).not.toHaveProperty(`pass_word`);
            expect(typeof userNew.email).toBe(`string`);
            expect(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userNew.email)).toBe(true)

            if (userNew.email !== `thanh@gmail.com`) {
                throw new Error(`Email khong dung`)
            } 
        })

        it(`Case 2: Nen bao loi neu email da ton tai`, () => {
            // throw new Error(`Function not implemented.`);
            // console.log(`ham IT case 2 chay`);
        })
    })



    afterEach(() => {
        console.log(`chay sau ham IT`)
    })

    describe(`authService.login`, () => {
        it(`Case 1: Kiem tra login voi truong hop thanh cong`, async () => {
            
        })

        it(`Case 2: Kiem tra login voi truong hop thanh cong`, async () => {
            
        })
    })

});