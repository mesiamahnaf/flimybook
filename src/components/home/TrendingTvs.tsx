import Link from "next/link";
import moment from "moment";
import { Images, TrailerButton } from "../ui";

//Trpc
import { trpc } from "@/trpc/server";

const TrendingTvs = async () => {
    //Calling function
    const tvs = await trpc.tv.trendingTvs();

    return (
        <div className="py-4">
            <div className="py-5 relative before:w-4 before:bg-c-purple before:absolute before:left-0 before:top-5 before:bottom-5 before:rounded flex gap-1 items-center">
                <h4 className="text-2xl font-bold ml-6 flex-1">Trending Series</h4>
            </div>
            <div className="grid grid-cols-7 gap-5 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 lsm:grid-cols-4 sm:grid-cols-3 xxs:grid-cols-2">
                {tvs?.results.map((item, i) => (
                    <div key={i} className="shadow-lg shadow-main/10 rounded-xl overflow-hidden">
                        <div className="relative">
                            <Link href={`/tv/${item.id}`}>
                                <Images
                                    src={process.env.NEXT_PUBLIC_MOVIE_API_IMAGE + item.poster_path}
                                    alt={item.name}
                                />
                            </Link>
                            <TrailerButton id={item.id} type="tv" />
                        </div>
                        <div className="px-3 pb-4 pt-6">
                            <Link href={`/tv/${item.id}`}>
                                <h6 className="font-bold line-clamp-1 mb-1.5" title={item.name}>{item.name}</h6>
                                <p className="text-sm opacity-70">{moment(item.first_air_date).format("MMMM DD, YYYY")}</p>
                            </Link>
                        </div>
                    </div>
                ))}
                <Link href="/tvs" className="relative rounded-lg block overflow-hidden">
                    <Images src="/movie.jpg" alt="see more" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 z-20">
                        <p className="text-white text-lg whitespace-nowrap">See More</p>
                    </div>
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-c-purple/90 to-c-purple/80 w-full h-full" />
                </Link>
            </div>
        </div>
    );
};

export default TrendingTvs;