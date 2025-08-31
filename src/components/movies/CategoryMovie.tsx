import Link from "next/link";
import moment from "moment";
import { Images, TrailerButton } from "../ui";

//Supabase
import { TrendingMoviesData } from "@/server/movies/output/movie.output";

//Fetching function
async function getTrendingMovies(url: string) {
    const res = await fetch(url)
    if (!res.ok) {
        return null;
    }
    return res.json()
}

//Interface
interface Props {
    url: string;
    name: string;
}

const CategoryMovie = async ({ url, name }: Props) => {
    //Calling function
    const movies: TrendingMoviesData | null = await getTrendingMovies(url)

    return (
        <div className="mt-4">
            <div className="py-5 relative before:w-4 before:bg-c-purple before:absolute before:left-0 before:top-5 before:bottom-5 before:rounded flex gap-1 items-center">
                <h4 className="text-2xl font-bold ml-6 flex-1">{name}</h4>
            </div>
            <div className="grid grid-cols-7 gap-5 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 lsm:grid-cols-4 sm:grid-cols-3 xxs:grid-cols-2">
                {movies?.results.map((item, i) => (
                    <div key={i} className="shadow-lg shadow-c-purple/10 rounded-xl overflow-hidden">
                        <div className="relative">
                            <Link href={`/movie/${item.id}`}>
                                <Images src={process.env.NEXT_PUBLIC_MOVIE_API_IMAGE + item.poster_path} alt={item.title} />
                            </Link>
                            <TrailerButton id={item.id} type="movie" />
                        </div>
                        <div className="px-3 pb-4 pt-6">
                            <Link href={`/movie/${item.id}`}>
                                <h6 className="font-bold line-clamp-1 mb-1.5" title={item.title}>{item.title}</h6>
                                <p className="text-sm opacity-70">{moment(item.release_date).format("MMMM DD, YYYY")}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryMovie;