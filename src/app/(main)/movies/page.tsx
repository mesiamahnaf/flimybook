import type { Metadata } from "next";
import { Container } from "@/components/ui";

//Components
import CategoryMovie from "@/components/movies/CategoryMovie";

export const metadata: Metadata = {
    title: "All Movies"
}

const Page = () => {
    return (
        <section className="pt-[100px] pb-[80px]">
            <Container>
                <div className="bg-[url(/movie-banners.png)] bg-cover bg-center text-white py-9 px-10 relative rounded-xl overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-4xl xxs:text-4xl font-bold mb-1">Movies</h3>
                        <h6 className="text-lg font-medium">Stay update with all kind of movies</h6>
                    </div>
                    <div className="absolute left-0 top-0 w-full h-full bg-c-purple/90" />
                </div>
                <CategoryMovie
                    url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`}
                    name="Now Playing"
                />
                <CategoryMovie
                    url={`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`}
                    name="Popular"
                />
                <CategoryMovie
                    url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`}
                    name="Top Rated"
                />
                <CategoryMovie
                    url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`}
                    name="Upcoming"
                />
            </Container>
        </section>
    );
};

export default Page;