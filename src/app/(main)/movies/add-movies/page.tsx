import type { Metadata } from "next";

//Components
import AddMovies from "@/components/movies/AddMovies";

export const metadata: Metadata = {
    title: "Add movies"
}

const Page = () => {
    return (
        <section className="pt-[100px]">
            <AddMovies />
        </section>
    );
};

export default Page;