"use client"
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

//Supabase
import { Cast } from "@/server/movies/output/movie.output";

//Interface
interface Props {
    casts: Cast[] | undefined
}

const Carousels = ({ casts }: Props) => {
    //Initializing hook
    const [emblaRef] = useEmblaCarousel({
        containScroll: "trimSnaps",
        dragFree: true,
        skipSnaps: true,
        startIndex: 0,

    })

    return (
        <div className="embla col-span-10 xxs:max-lg:col-span-1 overflow-hidden">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex gap-4">
                    {casts?.map((item, i) => {
                        if (item.profile_path) {
                            return (
                                <div className="embla__slide border border-solid border-black/10 rounded-xl overflow-hidden flex-[0_0_20%] lg:flex-[0_0_20%] md:flex-[0_0_35%] lsm:flex-[0_0_40%] msm:flex-[0_0_50%] sm:flex-[0_0_60%] xxs:flex-[0_0_80%]" key={i}>
                                    <Image
                                        src={process.env.NEXT_PUBLIC_MOVIE_API_IMAGE as string + item.profile_path}
                                        alt={item.name}
                                        width={135}
                                        height={250}
                                        className="h-[250px] w-full object-cover object-left"
                                    />
                                    <div className="px-3 py-3">
                                        <h4 className="font-bold text-lg">{item.original_name}</h4>
                                        <p className="opacity-80">{item.character}</p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default Carousels;