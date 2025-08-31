import { z } from "zod";

export interface BookFormInput {
    name: string;
    writer: string;
    date: string;
    totalPage: string;
    totalDays: string;
    type: string;
}

export const bookInput = z.object({
    name: z.string(),
    writer: z.string(),
    date: z.string(),
    totalPage: z.string(),
    totalDays: z.string(),
    type: z.string()
})

export type BookInput = z.infer<typeof bookInput>;