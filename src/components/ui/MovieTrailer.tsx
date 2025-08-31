"use client"
import { useState } from "react";
import ReactPlayer from "react-player";
import { Dialog, Loading } from "@/components/ui";

//Trpc
import { trpc } from "@/trpc/client";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    id: number;
}

const MovieTrailer = ({ open, onClose, id }: Props) => {
    //State
    const [trailer, setTrailer] = useState<string>("");

    //Trpc
    const { data, isFetching } = trpc.movie.singleMovie.useQuery(id);

    //Change
    const filteredResults = data?.videos.results.filter((result, index) => {
        const name = result.name.toLowerCase();
        const includesKeyword = (
            name.includes("official trailer") ||
            name.includes("trailer") ||
            name.includes("teaser")
        );
        return includesKeyword || index === data.videos.results.length - 1;
    })
        .sort((a, b) => {
            if (a.name.includes("Official Trailer") && !b.name.includes("Official Trailer")) {
                return -1; // a comes before b
            } else if (!a.name.includes("Official Trailer") && b.name.includes("Official Trailer")) {
                return 1; // b comes before a
            }
            return 0; // no change in order
        })
        .slice(0, 6);

    //Change Trailer Handler

    const onTrailerChange = (key: string) => {
        setTrailer(key)
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="w-[1000px] xl:w-[1000px] lg:w-[800px] md:w-[650px] lsm:w-[560px] msm:w-[500px] sm:w-[420px] xs:w-[330px] xxs:w-[280px] p-0 overflow-hidden"
        >
            <div className="p-3">
                {data &&
                    <div>
                        <p className="font-bold text-lg mb-1.5">{data?.title}</p>
                        <div className="flex gap-5 flex-wrap">
                            {filteredResults?.map((item, i) => (
                                <button className="bg-gradient-to-r from-c-initial to-c-final text-white text-sm py-1 px-3 rounded" onClick={() => onTrailerChange(item.key)} key={i}>
                                    {item.name.length > 10 ? `${item.name.slice(0, 17)}...` : item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                }
            </div>
            <div className="aspect-video bg-black">
                {filteredResults && filteredResults.length > 0 && (
                    <ReactPlayer
                        src={`https://www.youtube.com/watch?v=${trailer || filteredResults && filteredResults[0]?.key}`}
                        width="100%"
                        height="100%"
                        controls={true}
                        playing={true}
                    />
                )}
                {filteredResults?.length === 0 &&
                    <div className="h-full w-full flex justify-center items-center">
                        <p className="text-[17px] opacity-60 font-medium">No trailer found!</p>
                    </div>
                }
                {isFetching &&
                    <div className="h-full w-full flex justify-center items-center">
                        <Loading className="stroke-white" size={50} />
                    </div>
                }
            </div>
        </Dialog>
    );
};

export default MovieTrailer;