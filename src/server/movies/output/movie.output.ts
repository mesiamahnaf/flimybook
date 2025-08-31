import { inferRouterOutputs } from "@trpc/server";
import type { movieRouter } from "../movies.router";


type TMovieRouter = inferRouterOutputs<typeof movieRouter>;
export type TMovies = TMovieRouter["movieList"]["data"][number];
export type TWishlist = TMovieRouter["wishlist"][number];
export type TGetTV = TMovieRouter["getTv"][number];

export interface MoviesData {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TrendingMoviesData {
    results: MoviesData[];
}

export interface GetSingleMovieData {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos: Videos;
}


export interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface Genre {
    id: number;
    name: string;
}

export enum OriginalLanguage {
    En = "en",
}

export interface ProductionCompany {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: OriginCountry;
}

export enum OriginCountry {
    Us = "US",
}

export interface ProductionCountry {
    iso_3166_1: OriginCountry;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Videos {
    results: Result[];
}

export interface Result {
    iso_639_1: OriginalLanguage;
    iso_3166_1: OriginCountry;
    name: string;
    key: string;
    site: Site;
    size: number;
    type: Type;
    official: boolean;
    published_at: string;
    id: string;
}

export enum Site {
    YouTube = "YouTube",
}

export enum Type {
    Clip = "Clip",
    Featurette = "Featurette",
    Teaser = "Teaser",
    Trailer = "Trailer",
}


export interface GetCreditData {
    id: number;
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: Department;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    cast_id?: number;
    character?: string;
    credit_id: string;
    order?: number;
    department?: Department;
    job?: string;
}

export enum Department {
    Acting = "Acting",
    Art = "Art",
    Camera = "Camera",
    CostumeMakeUp = "Costume & Make-Up",
    Crew = "Crew",
    Directing = "Directing",
    Editing = "Editing",
    Production = "Production",
    Sound = "Sound",
    VisualEffects = "Visual Effects",
    Writing = "Writing",
}

export interface GetSearchData {
    page: number;
    results: SearchResultData[];
    total_pages: number;
    total_results: number;
}

export interface SearchResultData {
    adult: boolean;
    backdrop_path?: null | string;
    id: number;
    name?: string;
    original_language?: string;
    original_name?: string;
    overview?: string;
    poster_path?: string;
    media_type: SearchMediaType;
    genre_ids?: number[];
    popularity: number;
    first_air_date?: string;
    vote_average?: number;
    vote_count?: number;
    origin_country?: string[];
    gender?: number;
    known_for_department?: string;
    profile_path?: null | string;
    known_for?: SearchKnownFor[];
    title?: string;
    original_title?: string;
    release_date?: string;
    video?: boolean;
}

export interface SearchKnownFor {
    adult: boolean;
    backdrop_path: null | string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: null | string;
    media_type: SearchMediaType;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum SearchMediaType {
    Movie = "movie",
    Person = "person",
    Tv = "tv",
}
