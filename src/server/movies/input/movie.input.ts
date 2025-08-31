import { z } from "zod";

export interface MoviesFormInput {
    name: string;
    release_date: string;
    watch_date: string;
    poster: string;
    media_type: string;
}

export interface SeasonFormInput {
    season: string;
    releaseDate: string;
    watchDate: string;
    totalEpisode: string;
    day: string;
    tv: string;
}

export interface WishlistFormInput {
    name: string;
    releaseDate: string;
    poster: string;
    mediaType: string;
}

export const wishlistInput = z.object({
    movieId: z.string(),
    name: z.string(),
    releaseDate: z.string(),
    poster: z.string(),
    mediaType: z.string(),
    action: z.enum(["drop"]).nullish()
})

export const movieInput = z.object({
    movieId: z.string(),
    name: z.string(),
    releaseDate: z.string(),
    watchDate: z.string(),
    poster: z.string(),
    mediaType: z.string(),
    wishlistId: z.string().nullish()
})

export const seasonInput = z.object({
    season: z.string(),
    releaseDate: z.string(),
    watchDate: z.string(),
    totalEpisode: z.string(),
    day: z.string(),
    tv: z.string()
})


export type WishlistInput = z.infer<typeof wishlistInput>;
export type MovieInput = z.infer<typeof movieInput>;
export type SeasonInput = z.infer<typeof seasonInput>;