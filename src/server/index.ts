import { router } from "./trpc/server";

//Routers
import { userRouter } from "./user/user.router";
import { movieRouter } from "./movies/movies.router";
import { tvRouter } from "./tv/tv.router";
import { bookRouter } from "./books/book.router";

export const appRouter = router({
    users: userRouter,
    movie: movieRouter,
    tv: tvRouter,
    book: bookRouter
});

export type AppRouter = typeof appRouter;