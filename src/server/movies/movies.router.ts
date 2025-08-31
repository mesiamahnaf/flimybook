import { z } from "zod";
import { procedure, router } from "@/server/trpc/server";

//Services
import { MovieService } from "./movies.service";
const movieService = new MovieService();

//Input
import { wishlistInput, movieInput, seasonInput } from "./input/movie.input";
import { paginationInput } from "@/trpc/common/pagination.input";

export const movieRouter = router({
    trendingMovies: procedure.query(() => {
        return movieService.trendingMovies();
    }),
    singleMovie: procedure.input(z.number()).query(({ input }) => {
        return movieService.singleMovie(input);
    }),
    getCast: procedure.input(z.number()).query(({ input }) => {
        return movieService.getCast(input);
    }),
    getSearch: procedure.input(z.string()).query(({ input }) => {
        return movieService.getSearch(input);
    }),
    getTv: procedure.input(z.string()).query(({ input, ctx }) => {
        return movieService.getTv(input, ctx.session);
    }),
    movieList: procedure.input(paginationInput).query(({ input, ctx }) => {
        return movieService.movieList(input, ctx.session);
    }),
    wishlist: procedure.query(({ ctx }) => {
        return movieService.wishlist(ctx.session);
    }),
    check: procedure.input(z.string()).query(({ input, ctx }) => {
        return movieService.check(input, ctx.session);
    }),
    addWishlist: procedure.input(wishlistInput).mutation(({ input, ctx }) => {
        return movieService.addWishlist(input, ctx.session)
    }),
    addMovie: procedure.input(movieInput).mutation(({ input, ctx }) => {
        return movieService.addMovie(input, ctx.session);
    }),
    addSeason: procedure.input(seasonInput).mutation(({ input }) => {
        return movieService.addSeason(input);
    }),
    drop: procedure.input(z.string()).mutation(({ input, ctx }) => {
        return movieService.drop(input, ctx.session);
    })
});