import type { Metadata } from "next";

//Components
import MovieHeader from "@/components/single-movies/MovieHeader";
import Casts from "@/components/single-movies/Casts";
import Media from "@/components/single-movies/Media";

//Trpc
import { trpc, HydrateClient } from "@/trpc/server";

export const metadata: Metadata = {
    title: "Movie Details"
}

const Page = async ({ params }: PageProps<"/movie/[id]">) => {
    //Id
    const { id } = await params;

    //Trpc
    void trpc.movie.singleMovie.prefetch(Number(id));
    void trpc.movie.getCast.prefetch(Number(id));

    return (
        <HydrateClient>
            <MovieHeader id={Number(id)} />
            <Casts id={Number(id)} />
            <Media id={Number(id)} />
        </HydrateClient>
    );
};

export default Page;