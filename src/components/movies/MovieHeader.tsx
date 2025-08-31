"use client"

//Trpc
import { trpc } from "@/trpc/client";

const MovieHeader = () => {
    //Trpc
    const [data] = trpc.users.count.useSuspenseQuery();

    return (
        <div className="bg-[url('/movie-banners.png')] bg-cover bg-center text-white py-9 px-10 relative rounded-xl overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-4xl xxs:text-4xl font-bold mb-1">Movie List</h3>
                <h6 className="text-lg font-medium">Total Movies {data.movieCount}</h6>
            </div>
            <div className="absolute left-0 top-0 w-full h-full bg-c-purple/90" />
        </div>
    );
};

export default MovieHeader;