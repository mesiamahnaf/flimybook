"use client"
import Link from "next/link";

//Trpc
import { trpc } from "@/trpc/client";


const Movies = () => {
    //Trpc
    const [data] = trpc.users.count.useSuspenseQuery();

    return (
        <Link href="/movies/watch-list" className="overflow-hidden p-7 rounded-xl bg-[url(/movie.jpg)] bg-center text-white relative">
            <div className="relative z-10">
                <h3 className="text-3xl font-medium mb-1">Movies</h3>
                <p className="text-base mb-3">Total movies {data.movieCount}</p>
                <p className="text-xs font-light">Your movies dashboard</p>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-c-initial/85" />
        </Link>
    );
};

export default Movies;