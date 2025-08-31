"use client"
import Image from "next/image";
import { twMerge } from "tailwind-merge";

//Interface
interface Props {
    src: string;
    alt: string;
    className?: string;
}

const Images = ({ src, alt, className = "" }: Props) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={180}
            height={300}
            priority
            className={twMerge("rounded-md block aspect-[2/3] w-full h-full object-cover object-center transition-opacity opacity-0 duration-200 ease-in-out", className)}
            onLoad={(image) => image.currentTarget.classList.remove("opacity-0")}
        />
    );
};

export default Images;