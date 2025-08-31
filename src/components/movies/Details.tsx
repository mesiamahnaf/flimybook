"use client"
import { Fragment, useState } from "react";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import { Dialog } from "@/components/ui";

//Interface
import { TMovies } from "@/server/movies/output/movie.output";
interface Props {
    item: TMovies;
}

const Details = ({ item }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <h3 className="text-2xl sm:text-2xl xxs:text-[20px] font-bold cursor-pointer w-max" title="Click to see details" onClick={() => setOpen(true)}>{item.name}</h3>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="w-[800px]"
            >
                <div className="flex items-start gap-2 px-5 py-4">
                    <h2 className="text-xl font-bold flex-1">{item.name} <span className="text-lg font-medium opacity-50 capitalize">({item.mediaType})</span></h2>
                    <button className="bg-red-50 p-1 rounded bg-opacity-20 text-red-600" onClick={() => setOpen(false)}>
                        <IconX size={20} />
                    </button>
                </div>
                <hr className="border-gray-200" />
                <div className="max-h-[450px] overflow-auto p-4">
                    <div className="flex items-center gap-5 mb-3">
                        <div className="flex-[0_0_12%] sm:flex-[0_0_12%] xxs:flex-[0_0_40%]">
                            <Image
                                src={process.env.NEXT_PUBLIC_MOVIE_API_IMAGE as string + item.poster}
                                alt={item.name || ""}
                                width={180}
                                height={300}
                                className="block w-full h-full object-cover object-center transition-opacity opacity-0 rounded-md duration-200 ease-in-out"
                                onLoadingComplete={(image) => image.classList.remove("opacity-0")}
                            />
                        </div>
                        <div>
                            <p><span className="font-semibold">ID:</span> {item.movieId}</p>
                            <p><span className="font-semibold">Name:</span> {item.name}</p>
                            <p><span className="font-semibold">Release date:</span> {item.releaseDate}</p>
                            <p><span className="font-semibold">Watch date:</span> {item.watchDate}</p>
                        </div>
                    </div>

                    {item.mediaType === "tv" &&
                        <div className="text-black relative">
                            <h2 className="text-xl font-bold mb-2">Seasons</h2>
                            <hr />
                            {item.tvs?.map((tv, i) => (
                                <div className="my-2 bg-gradient-to-r from-indigo-50 via-white to-white border border-solid border-gradient py-3 px-4" key={i}>
                                    <p><span className="font-semibold">Season:</span> {tv.season}</p>
                                    <p><span className="font-semibold">Watch date:</span> {tv.watchDate}</p>
                                    <p><span className="font-semibold">Release date:</span> {tv.releaseDate}</p>
                                    <p><span className="font-semibold">Total episode:</span> {tv.totalEpisode} episode(s)</p>
                                    <p><span className="font-semibold">Total day:</span> {tv.day} day(s)</p>
                                </div>
                            ))}
                            {(item.tvs?.length === 0 || !item.tvs) &&
                                <p className="text-indigo-900 text-base mt-16 font-semibold text-center">You didn&apos;t watch any season yet</p>
                            }
                        </div>
                    }
                </div>
            </Dialog >
        </Fragment>
    );
};

export default Details;