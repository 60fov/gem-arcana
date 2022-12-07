import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const gemRouter = router({
    create: protectedProcedure
        .mutation(async ({ ctx }) => {
            const gemData = {
                color: Math.round(Math.random() * 360),
                mass: Math.trunc(Math.random() ** 2 * 1000),
                clarity: Math.random(),
                imbued: true,
            }

            const soulData = {
                color: Math.round(Math.random() * 360),
                purity: Math.random() ** 2,
                efficacy: Math.random() ** 2,
                freq: Math.round(Math.random() * 3886 + 65)
            }

            const gem = await ctx.prisma.gem.create({
                data: {
                    ...gemData,
                    soul: { create: { ...soulData } },
                    user: { connect: { id: ctx.session.user.id } },
                },
                include: {
                    soul: true
                }
            })

            return {
                ...gem
            }
        }),

    find: publicProcedure
        .input(z.string().cuid())
        .query(async ({ input, ctx }) => {

            const gem = await ctx.prisma.gem.findUnique({
                where: { id: input },
                include: { soul: true }
            })

            return {
                ...gem
            }
        })
})