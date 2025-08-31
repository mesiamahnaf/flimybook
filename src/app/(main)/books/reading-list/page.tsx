import type { Metadata } from "next";
import { Container } from "@/components/ui";

//Components
import BookHeader from "@/components/book/BookHeader";
import BookList from "@/components/book/BookList";

//Trpc
import { trpc, HydrateClient } from "@/trpc/server";

export const metadata: Metadata = {
    title: "Reading list "
}

const Page = async () => {
    //Trpc
    void trpc.users.count.prefetch();
    await trpc.book.list.prefetchInfinite({ search: "", limit: 12, cursor: 1 });

    return (
        <section className="mt-[100px]">
            <Container>
                <HydrateClient>
                    <div className="px-32 xl:px-32 lg:px-24 xxs:px-0">
                        <BookHeader />
                        <BookList />
                    </div>
                </HydrateClient>
            </Container>
        </section>
    );
};

export default Page;