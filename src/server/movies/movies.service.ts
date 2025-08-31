import { db, movies, wishlists, seasons } from "@/drizzle";
import { and, eq } from "@/drizzle/orm";

//Essentials
import { ReqUser } from "../trpc/req";

//Output
import { TrendingMoviesData, GetSingleMovieData, GetCreditData, GetSearchData } from "./output/movie.output";

//Input
import { WishlistInput, MovieInput, SeasonInput } from "./input/movie.input";
import { PaginationInput } from "@/trpc/common/pagination.input";
import { TRPCError } from "@trpc/server";

export class MovieService {
    async trendingMovies(): Promise<TrendingMoviesData | null> {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`)
        if (!res.ok) {
            return null;
        }
        return res.json();
    }

    async singleMovie(id: number): Promise<GetSingleMovieData | null> {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`)
        if (!res.ok) {
            return null;
        }
        return res.json()
    }

    async getCast(id: number): Promise<GetCreditData | null> {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`)
        if (!res.ok) {
            return null
        }
        return res.json()
    }

    async getSearch(input: string): Promise<GetSearchData | null> {
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${input.replace(/\s+/g, '%20')}`)
        if (!res.ok) {
            return null;
        }
        return res.json()
    }

    async getTv(input: string, reqUser: ReqUser) {
        const data = await db.query.movies.findMany({
            where: {
                name: {
                    ilike: `%${input.trim()}%`
                },
                userId: reqUser.user.id,
                mediaType: "tv"
            }
        })
        return data;
    }

    async movieList(input: PaginationInput, reqUser: ReqUser) {
        const pageSize = input.limit || 10;
        const offset = Number(input.cursor);

        const results = await db.query.movies.findMany({
            where: {
                userId: reqUser.user.id,
                ...(input.search && {
                    name: { ilike: `%${input.search.trim()}%` }
                })
            },
            limit: pageSize + 1,
            offset: (offset - 1) * pageSize,
            with: {
                tvs: true
            },
            orderBy: {
                watchDate: "desc"
            }
        });

        const hasNextPage = results.length > pageSize;
        const data = results.slice(0, pageSize);

        return {
            data,
            nextCursor: hasNextPage ? offset + 1 : null
        }
    }

    async wishlist(reqUser: ReqUser) {
        const data = await db.query.wishlists.findMany({
            where: {
                userId: reqUser.user.id
            }
        });

        return data;
    }

    async check(id: string, reqUser: ReqUser) {
        const isWishlist = await db.query.wishlists.findFirst({
            where: {
                movieId: id,
                userId: reqUser.user.id
            }
        });
        const isWatch = await db.query.movies.findFirst({
            where: {
                movieId: id,
                userId: reqUser.user.id
            }
        });
        return {
            isWishlist: isWishlist ? true : false,
            isWatch: isWatch ? true : false
        }
    }

    async addWishlist(input: WishlistInput, reqUser: ReqUser) {
        const has = await db.query.wishlists.findFirst({
            where: {
                movieId: input.movieId
            }
        });
        if (has) {
            if (input.action === "drop") {
                await db.delete(wishlists).where(eq(wishlists.id, has.id));
                return {
                    message: "Movie removed from the wishlist."
                }
            } else throw new TRPCError({ code: "NOT_FOUND", message: "Movie already in wishlist." })
        } else {
            await db.insert(wishlists).values({
                ...input,
                userId: reqUser.user.id
            })
            return {
                message: "Movie added to the wishlist."
            }
        }
    }

    async addMovie(input: MovieInput, reqUser: ReqUser) {
        const has = await db.query.movies.findFirst({
            where: {
                movieId: input.movieId,
                userId: reqUser.user.id
            }
        });
        if (has) throw new TRPCError({ code: "NOT_FOUND", message: "Movie already in watch list" });
        const { wishlistId, ...rest } = input;
        await db.insert(movies).values({
            ...rest,
            userId: reqUser.user.id
        });

        if (wishlistId) {
            await db.delete(wishlists).where(and(
                eq(wishlists.id, wishlistId),
                eq(wishlists.userId, reqUser.user.id)
            ))
        }

        return {
            message: "Movie added to the watch list."
        }
    }

    async addSeason(input: SeasonInput) {
        await db.insert(seasons).values(input);
        return {
            message: "Season added to the series."
        }
    }

    async drop(id: string, reqUser: ReqUser) {
        await db.delete(wishlists).where(and(
            eq(wishlists.id, id),
            eq(wishlists.userId, reqUser.user.id)
        ))
        return {
            message: "Wishlist item deleted successfully"
        }
    }
}