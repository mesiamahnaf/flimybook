"use client"
import Link from "next/link";
import moment from "moment";
import { Images } from "../ui";

//Components
import Buttons from "./list-menu/Buttons";

//TRPC
import { trpc } from "@/trpc/client";

const WishList = () => {
    //Trpc
    const [wishlist] = trpc.movie.wishlist.useSuspenseQuery();

    return (
        <div className="pb-10 mt-4">
            {wishlist?.map((item, i) => (
                <div className="my-2 bg-gradient-to-r from-c-initial/5 rounded-lg overflow-hidden via-white to-white" key={i}>
                    <div className="flex gap-4 items-center border border-solid border-gradient rounded-xl">
                        <div className="basis-[8%] lg:basis-[8%] md:basis-[14%] lsm:basis-[16%] msm:basis-[18%] sm:basis-[28%] xxs:basis-[30%] relative">
                            {item.poster &&
                                <Images src={process.env.NEXT_PUBLIC_MOVIE_API_IMAGE as string + item.poster} alt={item.name as string} className="rounded-l-lg rounded-r-none" />
                            }
                            <p className="absolute top-0 left-0 bg-indigo-900 text-white capitalize text-sm font-medium px-1">{item.mediaType}</p>
                        </div>
                        <div className="basis-[92%] lg:basis-[92%] md:basis-[86%] lsm:basis-[84%] msm:basis-[82%] sm:basis-[72%] xxs:basis-[70%]">
                            <Link href={`https://1hd.gg/search?keyword=${item.name?.replaceAll(" ", "+")}`} target="_blank" className="text-2xl w-max font-bold mb-0.5">{item.name}</Link>
                            <p className="text-base"><span className="font-bold">Released: </span>{moment(item.releaseDate).format("DD MMM YYYY")}</p>
                            <Buttons item={item} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WishList;