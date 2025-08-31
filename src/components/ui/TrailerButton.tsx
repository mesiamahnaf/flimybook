"use client"
import { useState } from "react";
import { IconPlayerPlay } from "@tabler/icons-react";


//Components
import MovieTrailer from "./MovieTrailer";
import TvTrailer from "./TvTrailer";

//Interface
interface Props {
    id: number;
    type: "tv" | "movie"
}

const TrailerButton = ({ id, type }: Props) => {
    //State
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div>
            <button className="absolute bg-[#081c22] w-10 h-10 rounded-full -bottom-4 left-3 flex items-center justify-center shadow-lg shadow-main/20" onClick={() => setOpen(id)}>
                <div className="border-2 border-solid border-green-600 rounded-full p-1 flex justify-center items-center">
                    <IconPlayerPlay className="text-white" size={22} />
                </div>
            </button>
            {type === "movie" ? <MovieTrailer
                open={open === id}
                onClose={() => setOpen(null)}
                id={id}
            /> : <TvTrailer
                open={open === id}
                onClose={() => setOpen(null)}
                id={id}
            />}
        </div>
    );
};

export default TrailerButton;