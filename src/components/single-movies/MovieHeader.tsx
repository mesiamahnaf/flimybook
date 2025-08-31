"use client"
import moment from "moment";
import { Container, Images } from "@/components/ui";

//Component
import Wishlist from "./Wishlist";

//Trpc
import { trpc } from "@/trpc/client";

//Interface
interface Props {
    id: number;
}

const MovieHeader = ({ id }: Props) => {
    //Trpc
    const [movie] = trpc.movie.singleMovie.useSuspenseQuery(id);

    if (!movie) return null;

    return (
        <div style={{ background: `url(${process.env.NEXT_PUBLIC_MOVIE_API_IMAGE as string + movie?.backdrop_path})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", position: "relative", zIndex: 10 }} className="pt-[100px] pb-[40px]">
            <Container>
                <div className="bg-black/60 text-white flex gap-2 py-4 items-center rounded-xl px-10">
                    <div className="flex-1">
                        <h4 className="text-2xl font-bold">{movie?.title}</h4>
                        <p>Filmography</p>
                    </div>
                    <div className="tex-sm xxs:max-msm:hidden">
                        TMDB
                    </div>
                </div>
            </Container>
            <Container className=" py-6">
                <div className="grid grid-cols-12 lg:grid-cols-12 xxs:grid-cols-1 gap-10">
                    <div className="col-span-3 xxs:max-lg:col-span-1">
                        <Images src={(process.env.NEXT_PUBLIC_MOVIE_API_IMAGE as string + movie?.poster_path) as string} alt={movie?.title as string} className="rounded-xl" />
                    </div>
                    <div className="col-span-8 xxs:max-lg:col-span-1 text-white">
                        <h4 className="text-3xl font-bold mb-1">{movie?.title}</h4>
                        <div className="flex gap-2 items-center">
                            <div>{moment(movie?.release_date).format("DD MMM YYYY")}</div>
                            <div className="w-1 h-1 rounded-full bg-white"></div>
                            <div>{movie?.genres.map(item => item.name).join(", ")}</div>
                            <div className="w-1 h-1 rounded-full bg-white"></div>
                            <div>{moment.duration(movie?.runtime, "minutes").hours()}h {moment.duration(movie?.runtime, "minutes").minutes()}m</div>
                        </div>
                        <div className="flex items-center gap-12 my-2">
                            <div className="flex gap-3 items-center">
                                <div className="w-14 h-14 bg-main rounded-full p-0.5">
                                    <div className="w-full h-full border-[3px] border-green-700 border-solid rounded-full relative">
                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold">{Math.ceil((movie?.vote_average as number * 100) / 10)}%</p>
                                    </div>
                                </div>
                                <p>User Score</p>
                            </div>
                            <Wishlist items={movie} />
                        </div>
                        <p className="italic text-lg opacity-70">{movie?.tagline}</p>
                        <div className="mb-6 mt-4">
                            <h6 className="text-xl font-bold">Overview</h6>
                            <p className="opacity-80">{movie?.overview}</p>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-3 xxs:grid-cols-2 gap-5">
                            {movie?.production_companies.map((item, i) => (
                                <div key={i}>
                                    <h4 className="text-base font-semibold">{item.name}</h4>
                                    <p className="opacity-80">{item.origin_country}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
            <div className="absolute w-full h-full top-0 left-0 bg-black/60 -z-10"></div>
        </div>
    );
};

export default MovieHeader;