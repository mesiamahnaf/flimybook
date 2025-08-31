import { db, books } from "@/drizzle";

//Essentials
import { ReqUser } from "../trpc/req";

//Input
import { BookInput } from "./input/book.input";
import { PaginationInput } from "@/trpc/common/pagination.input";

export class BookService {
    async list(input: PaginationInput, reqUser: ReqUser) {
        const pageSize = input.limit || 10;
        const offset = Number(input.cursor);

        const results = await db.query.books.findMany({
            where: {
                userId: reqUser.user.id,
                ...(input.search && {
                    name: { ilike: `%${input.search.trim()}%` }
                })
            },
            limit: pageSize + 1,
            offset: (offset - 1) * pageSize,
            orderBy: {
                date: "desc"
            }
        });

        const hasNextPage = results.length > pageSize;
        const data = results.slice(0, pageSize);

        return {
            data,
            nextCursor: hasNextPage ? offset + 1 : null
        }
    }

    async add(input: BookInput, reqUser: ReqUser) {
        await db.insert(books).values({
            ...input,
            userId: reqUser.user.id
        });
        return {
            message: "Book added to the reading list."
        }
    }
}