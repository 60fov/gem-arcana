import { z } from "zod";

const username =
    z.string()
        .min(2).max(12)
        .refine((val) => !val.match(/[^\p{L}\p{Nd}$!_]/gu))

export const zValidator = {
    username
}