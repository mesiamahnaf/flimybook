import type { Metadata } from "next";
import { Container } from "@/components/ui";

//Components
import MovieHeader from "@/components/movies/MovieHeader";
import MoviesList from "@/components/movies/MovieList";

//Trpc
import { trpc, HydrateClient } from "@/trpc/server";


export const metadata: Metadata = {
    title: "Watch list"
}

const Watchlist = async () => {
    //Trpc
    await trpc.movie.movieList.prefetchInfinite({ search: "", limit: 20, cursor: 1 });
    void trpc.users.count.prefetch();

    return (
        <section className="mt-[100px]">
            <Container>
                <HydrateClient>
                    <div className="px-32 xl:px-32 lg:px-24 xxs:px-0">
                        <MovieHeader />
                        <MoviesList />
                    </div>
                </HydrateClient>
            </Container>
        </section>
    );
};

export default Watchlist;