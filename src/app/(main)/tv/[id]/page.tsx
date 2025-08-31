import type { Metadata } from "next";

//Components
import TvHeader from "@/components/single-tvs/TvHeader";
import Casts from "@/components/single-tvs/Casts";
import Media from "@/components/single-tvs/Media";

//Trpc
import { trpc, HydrateClient } from "@/trpc/server";


export const metadata: Metadata = {
    title: "Tv details"
}

const Page = async ({ params }: PageProps<"/tv/[id]">) => {
    //Id
    const { id } = await params;

    //Trpc
    void trpc.tv.singleTv.prefetch(Number(id));
    void trpc.tv.getCast.prefetch(Number(id));

    return (
        <HydrateClient>
            <TvHeader id={Number(id)} />
            <Casts id={Number(id)} />
            <Media id={Number(id)} />
        </HydrateClient>
    );
};

export default Page;