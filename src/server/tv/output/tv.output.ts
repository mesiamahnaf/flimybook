export interface TvsData {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
}

export interface TrendingTvsData {
    results: TvsData[];
}


export interface GetSingleTvTypes {
    adult: boolean;
    backdrop_path: string;
    created_by: CreatedBy[];
    episode_run_time: string[];
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: OriginalLanguage[];
    last_air_date: string;
    last_episode_to_air: LastEpisodeToAir;
    name: string;
    next_episode_to_air: null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: OriginCountry[];
    original_language: OriginalLanguage;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Network[];
    production_countries: ProductionCountry[];
    seasons: Season[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    videos: Videos;
}

export interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: null | string;
}

export interface Genre {
    id: number;
    name: string;
}

export enum OriginalLanguage {
    En = "en",
}

export interface LastEpisodeToAir {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
}

export interface Network {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
}

export enum OriginCountry {
    Us = "US",
}

export interface ProductionCountry {
    iso_3166_1: OriginCountry;
    name: string;
}

export interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: OriginalLanguage;
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
    Teaser = "Teaser",
    Trailer = "Trailer",
}