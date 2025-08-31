"use client"
import Link from "next/link";
import { Container } from "@/components/ui";

//Components
import Carousels from "../single-movies/Carousels";

//Trpc
import { trpc } from "@/trpc/client";

//Interface
interface Props {
    id: number;
}

const Casts = ({ id }: Props) => {
    //Trpc
    const [credit] = trpc.tv.getCast.useSuspenseQuery(id);
    const [tv] = trpc.tv.singleTv.useSuspenseQuery(id);


    return (
        <Container className=" py-10">
            <h4 className="text-2xl font-bold mb-7">Top Billed Cast</h4>
            <div className="grid grid-cols-12 lg:grid-cols-12 xxs:grid-cols-1 gap-8">
                <Carousels casts={credit?.cast} />
                <div className="col-span-2  xxs:max-lg:col-span-1">
                    <div className="mb-2">
                        <h4 className="text-lg font-bold">Status</h4>
                        <p className="opacity-80">{tv?.status}</p>
                    </div>
                    <div className="mb-2">
                        <h4 className="text-lg font-bold">Original Language</h4>
                        <p className="opacity-80 uppercase">{tv?.original_language}</p>
                    </div>
                    <div>
                        <Link href={`https://www.themoviedb.org/tv/${tv?.id}`} className="text-main font-bold underline" target="_blank">
                            See Details
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Casts;