import { z } from "zod";

export const paginationInput = z.object({
    limit: z.number().nullish(),
    search: z.string().nullish(),
    cursor: z.number().nullish(),
});

export type PaginationInput = z.infer<typeof paginationInput>;