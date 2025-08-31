"use client"
import { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { IconEyeCheck, IconMovie } from "@tabler/icons-react";
import { Loading } from "@/components/ui";

//Component
import Details from "./Details";

//Trpc
import { trpc } from "@/trpc/client";

const MoviesList = () => {
    //State
    const [search, setSearch] = useState<string>("");

    //Trpc
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } = trpc.movie.movieList.useInfiniteQuery({
        search: search,
        limit: 20
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: 1
    });

    return (
        <div className="mb-14">
            <div className="mt-3">
                <p className="text-lg font-medium mb-2">Search for!</p>
                <div className="w-1/2 lg:w-1/2 xxs:w-full relative">
                    <input
                        placeholder="The Great wall..."
                        className="focus:outline-none border border-solid border-indigo-900/20 w-full py-2 px-3 rounded placeholder:text-blue-gray-400"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <div className="absolute top-1/2 right-5 -translate-y-1/2">
                        {isFetching &&
                            <Loading className="stroke-c-initial" />
                        }
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2 xxs:grid-cols-1 mt-4">
                {data?.pages.flatMap(a => a.data).map((item) => (
                    <div className="flex gap-4 items-center my-2 bg-gradient-to-r from-c-purple/5 via-white to-white border border-solid border-gradient col-start-1 relative" key={item.id}>
                        <div className="basis-[15%] msm:basis-[15%] sm:basis-[22%] xxs:basis-[35%] relative">
                            <Image
                                src={process.env.NEXT_PUBLIC_MOVIE_API_IMAGE as string + item.poster}
                                alt={item.name || ""}
                                width={180}
                                height={300}
                                priority
                                className="block w-full h-full object-cover object-center transition-opacity opacity-0 duration-200 ease-in-out"
                                onLoad={(image) => image.currentTarget.classList.remove("opacity-0")}
                            />
                            <p className="absolute top-0 left-0 bg-indigo-900 text-white capitalize text-sm font-medium px-1">{item.mediaType}</p>
                        </div>
                        <div className="basis-[85%] msm:basis-[85%] sm:basis-[78%] xxs:basis-[65%]">
                            <Details item={item} />
                            <p className="text-base flex items-center gap-2 mt-2">
                                <IconMovie size={20} className="inline text-indigo-900" />
                                <span className="font-bold">Released: </span>
                                <span>{moment(item.releaseDate).format("DD MMM YYYY")}</span>
                            </p>
                            <p className="text-base flex items-center gap-2">
                                <IconEyeCheck size={20} className="inline text-indigo-900" />
                                <span className="font-bold">Watched: </span>
                                <span>{moment(item.watchDate).format("DD MMM YYYY")}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {hasNextPage &&
                <button className="bg-gradient-to-r from-indigo-50 via-white to-white border border-solid border-gradient text-base font-bold py-2 pl-2 pr-14 relative text-left" onClick={() => fetchNextPage()}>
                    Load more
                    <div className="absolute top-1/2 right-0 -translate-y-1/2">
                        {isFetchingNextPage &&
                            <Loading className="stroke-c-initial" />
                        }
                    </div>
                </button>
            }
        </div>
    );
};

export default MoviesList;