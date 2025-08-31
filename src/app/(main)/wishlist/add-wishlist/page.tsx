import type { Metadata } from "next";

//Components
import AddWishlist from "@/components/wishlist/AddWishlist";

export const metadata: Metadata = {
    title: "Add wishlist"
}

const Page = () => {
    return (
        <section className="pt-[100px]">
            <AddWishlist />
        </section>
    );
};

export default Page;