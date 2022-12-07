import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const usernameValidator =
    z.string()
        .min(3).max(12)
        .refine((val) => !val.match(/[^\p{L}\p{Nd}$!_]/gu))

export const userRouter = router({
    me: protectedProcedure
        .query(async ({ ctx }) => {

            try {
                const me = await ctx.prisma.user.findUniqueOrThrow({
                    where: { id: ctx.session.user.id }
                })
                return { ...me }
            } catch (e) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "authed but no user exists (???)",
                    cause: e
                })
            }

        }),

    findById: publicProcedure
        .input(
            z.string()
                .cuid()
        )
        .query(async ({ input, ctx }) => {

            const user = await ctx.prisma.user.findUnique({
                where: { id: input }
            })

            return {
                user
            }
        }),

    findByUsername: publicProcedure
        .input(usernameValidator)
        .query(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { username: input }
            })
            return {
                user
            }
        }),

    setUsername: protectedProcedure
        .input(usernameValidator)
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: { username: input }
            })
            return {
                user
            }
        })
})