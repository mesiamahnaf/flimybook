import { procedure, router } from "@/server/trpc/server";

//Services
import { BookService } from "./book.service";
const bookService = new BookService();

//Input
import { bookInput } from "./input/book.input";
import { paginationInput } from "@/trpc/common/pagination.input";

export const bookRouter = router({
    list: procedure.input(paginationInput).query(({ input, ctx }) => {
        return bookService.list(input, ctx.session);
    }),
    add: procedure.input(bookInput).mutation(({ input, ctx }) => {
        return bookService.add(input, ctx.session);
    })
});