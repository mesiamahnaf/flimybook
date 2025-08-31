//Output
import { TrendingTvsData, GetSingleTvTypes } from "./output/tv.output";
import { GetCreditData } from "../movies/output/movie.output";

export class TvService {
    async trendingTvs(): Promise<TrendingTvsData | null> {
        const res = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`)
        if (!res.ok) {
            return null;
        }
        return res.json();
    }

    async singleTv(id: number): Promise<GetSingleTvTypes | null> {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`)
        if (!res.ok) {
            return null;
        }
        return res.json()
    }

    async getCast(id: number): Promise<GetCreditData | null> {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}`)
        if (!res.ok) {
            return null;
        }
        return res.json()
    }
}