import type { Metadata } from "next";

//Components
import AddBook from "@/components/book/AddBook";

export const metadata: Metadata = {
    title: "Add books"
}

const Page = () => {
    return (
        <section className="mt-[100px]">
            <AddBook />
        </section>
    );
};

export default Page;