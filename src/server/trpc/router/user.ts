import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { zValidator } from "../../../utils/validators";
import { protectedProcedure, publicProcedure, router } from "../trpc";

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

    find: publicProcedure
        .input(
            z.string()
                .cuid()
                .or(zValidator.username)
        )
        .query(async ({ input, ctx }) => {
            if (z.string().cuid().safeParse(input).success) {
                try {
                    const user = await ctx.prisma.user.findUniqueOrThrow({
                        where: { id: input },
                        select: {
                            id: true,
                            username: true
                        }
                    })

                    return user
                } catch (e) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `user not found, id: ${input}`,
                        cause: e
                    })
                }
            }
            try {
                const user = await ctx.prisma.user.findUniqueOrThrow({
                    where: { username: input },
                    select: {
                        id: true,
                        username: true
                    }
                })

                return user
            } catch (e) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `user not found, username: ${input}`,
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
            try {
                const user = await ctx.prisma.user.findUniqueOrThrow({
                    where: { id: input },
                    select: {
                        id: true,
                        username: true
                    }
                })

                return user
            } catch (e) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `user not found, id: ${input}`,
                    cause: e
                })
            }

        }),

    findByUsername: publicProcedure
        .input(zValidator.username)
        .query(async ({ input, ctx }) => {

            try {
                const user = await ctx.prisma.user.findUniqueOrThrow({
                    where: { username: input },
                    select: {
                        id: true,
                        username: true
                    }
                })

                return user
            } catch (e) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `user not found, username: ${input}`,
                    cause: e
                })
            }
        }),

    setUsername: protectedProcedure
        .input(zValidator.username)
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: { username: input },
            })
            return {
                ...user
            }
        }),

    getGems: publicProcedure
        .input(
            z.string()
                .cuid()
        )
        .query(async ({ input, ctx }) => {
            try {
                const user = await ctx.prisma.user.findUniqueOrThrow({
                    where: { id: input },
                    select: {
                        gems: true
                    }
                })

                return user.gems
            } catch (e) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `user not found, id: ${input}`,
                    cause: e
                })
            }
        })


})