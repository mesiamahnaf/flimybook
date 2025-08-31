import { Container } from "@/components/ui";
import type { Metadata } from "next";

//Components
import CategoryTv from "@/components/tv/CategoryTv";

export const metadata: Metadata = {
    title: "All TV"
}

const Page = () => {
    return (
        <section className="pt-[100px] pb-[80px]">
            <Container>
                <div className="bg-[url(/movie-banners.png)] bg-cover bg-center text-white py-9 px-10 relative rounded-xl overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-4xl xxs:text-4xl font-bold mb-1">TV Series</h3>
                        <h6 className="text-lg font-medium">Stay update with all kind of tv series</h6>
                    </div>
                    <div className="absolute left-0 top-0 w-full h-full bg-c-purple/90" />
                </div>
                <CategoryTv
                    url={`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`}
                    name="Airing Today"
                />
                <CategoryTv
                    url={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`}
                    name="On the Air"
                />
                <CategoryTv
                    url={`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`}
                    name="Popular"
                />
                <CategoryTv
                    url={`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`}
                    name="Top Rated"
                />
            </Container>
        </section>
    );
};

export default Page;