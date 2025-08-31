"use client"
import Link from "next/link";
import Image from "next/image";
import { IconPlayerPlay } from "@tabler/icons-react";
import { Container } from "@/components/ui";

//Trpc
import { trpc } from "@/trpc/client";

const Media = ({ id }: { id: number }) => {
    //trpc
    const [movie] = trpc.tv.singleTv.useSuspenseQuery(id);

    return (
        <section>
            <Container>
                <h4 className="text-2xl font-bold mb-7">Trailers</h4>
                <div className="grid grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 xxs:grid-cols-1 gap-8 msm:gap-8 xxs:gap-4">
                    {movie?.videos.results?.map((item, i) => (
                        <Link href={`https://www.youtube.com/watch?v=${item.key}`} target="_blank" className="relative block overflow-hidden  rounded-2xl" key={i}>
                            <Image src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`} width={480} height={360} alt={item.name} className="w-full h-full" />
                            <div className="w-full h-full bg-c-initial/15 absolute top-0  left-0" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r  from-c-initial to-c-final text-white py-4  px-6 rounded-2xl">
                                <IconPlayerPlay className="text-3xl" />
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Media;