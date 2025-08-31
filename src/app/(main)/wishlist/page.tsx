import type { Metadata } from "next";
import { Container } from "@/components/ui";

//Components
import WishlistHeader from "@/components/wishlist/WishlistHeader";
import WishList from "@/components/wishlist/WishList";

//Trpc
import { trpc, HydrateClient } from "@/trpc/server";

export const metadata: Metadata = {
    title: "Wish list"
}

const Page = async () => {
    //Trpc
    void trpc.movie.wishlist.prefetch();

    return (
        <Container className="mt-[100px]">
            <HydrateClient>
                <div className="px-32 xl:px-32 lg:px-24 xxs:px-0">
                    <WishlistHeader />
                    <WishList />
                </div>
            </HydrateClient>
        </Container>
    );
};

export default Page;