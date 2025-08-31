import { Metadata } from "next";

//Components
import AddSeason from "@/components/season/AddSeason";

export const metadata: Metadata = {
    title: "Add Season"
}

const Page = async () => {
    return (
        <section className="pt-[100px]">
            <AddSeason />
        </section>
    );
};

export default Page;