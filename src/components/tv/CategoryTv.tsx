import Link from "next/link";
import moment from "moment";
import { Images, TrailerButton } from "../ui";

//Supabase
import { TrendingTvsData } from "@/server/tv/output/tv.output";

//Fetching function
async function getTrendingTvs(url: string) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

//Interface
interface Props {
    url: string;
    name: string;
}

const CategoryTv = async ({ url, name }: Props) => {
    //Calling function
    const tvs: TrendingTvsData = await getTrendingTvs(url);

    return (
        <div className="py-4">
            <div className="py-5 relative before:w-4 before:bg-c-purple before:absolute before:left-0 before:top-5 before:bottom-5 before:rounded flex gap-1 items-center">
                <h4 className="text-2xl font-bold ml-6 flex-1">{name}</h4>
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
                            <TrailerButton type="tv" id={item.id} />
                        </div>
                        <div className="px-3 pb-4 pt-6">
                            <Link href={`/tv/${item.id}`}>
                                <h6 className="font-bold line-clamp-1 mb-1.5" title={item.name}>{item.name}</h6>
                                <p className="text-sm opacity-70">{moment(item.first_air_date).format("MMMM DD, YYYY")}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryTv;