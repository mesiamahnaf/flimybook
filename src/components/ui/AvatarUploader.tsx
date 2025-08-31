"use client"
import { useState, useEffect } from "react";
import { ImageUpload, ImageType } from "@siamf/upload";
import Image from "next/image";
import { IconPhoto, IconUpload, IconAlertCircleFilled } from "@tabler/icons-react";
import { useUpload } from "./useUpload";

//Components
import Loading from "./Loading";

//Interface
interface Props {
    onChange?: (e: string) => void;
    size?: number;
    value?: string;
    className?: string;
    maxFileSize?: number;
    errorMessage?: string;
}


const AvatarUploader = ({ onChange, size = 500, value, maxFileSize, errorMessage }: Props) => {
    //State
    const [image, setImage] = useState<ImageType>({
        dataURL: value ? value : undefined
    });

    //Upload
    const { error, isUploading, upload } = useUpload();

    //Handler
    const onImageChange = async (image: ImageType) => {
        setImage(image);
        if (image && image.file) {
            const { blob } = await upload(image.file);
            if (blob) {
                onChange?.(blob.url)
            }
        }
    }

    //Effect
    useEffect(() => {
        setImage({
            dataURL: value ? value : undefined
        })
    }, [value]);


    return (
        <ImageUpload
            onChange={onImageChange}
            value={image}
            resolutionWidth={size}
            resolutionHeight={size}
            resolutionType="ratio"
            maxFileSize={maxFileSize ?? undefined}
        >
            {({
                isDragging,
                dragProps,
                onImageUpload,
                errors,
            }) => (
                <div>
                    <div className="w-[150px] h-[150px] relative cursor-pointer select-none" {...dragProps} onClick={onImageUpload}>
                        {!image?.dataURL &&
                            <div className={`border flex items-center justify-center w-full h-full ${isDragging ? "border-success" : "border-gray-200 shadow-9xl"} rounded-full`}>
                                <IconPhoto className="text-c-purple" size={50} stroke={1.4} />
                            </div>
                        }
                        {image?.dataURL &&
                            <Image src={image.dataURL} width={size || 1000} height={size || 1000} alt="Selected Image" className="object-contain w-full h-full rounded-full" />
                        }
                        {isUploading &&
                            <div className="absolute top-0 left-0 w-full h-full bg-white/80 flex justify-center items-center rounded-full">
                                <Loading />
                            </div>
                        }
                        <div className="border border-solid border-gray-200 w-[40px] h-[40px] rounded-full flex items-center justify-center absolute bottom-0 right-0 bg-white">
                            <IconUpload size={22} />
                        </div>
                    </div>
                    <p className={`text-sm text-red-600 mt-1 flex items-center gap-1 transition-all ${errorMessage ? "opacity-100 visible -translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                        <span className="basis-[15px]">
                            <IconAlertCircleFilled className="text-[10px]" />
                        </span>
                        <span>{errorMessage}</span>
                    </p>
                    {error &&
                        <p className={`text-sm text-red-600 mt-1 flex items-center gap-1 transition-all ${errorMessage ? "opacity-100 visible -translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                            <span className="basis-[15px]">
                                <IconAlertCircleFilled className="text-[10px]" />
                            </span>
                            <span>{error}</span>
                        </p>
                    }
                    {errors &&
                        <ul className="mt-3 ml-1">
                            {errors.maxFileSize &&
                                <li className="flex text-sm text-red-600 items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-red-600" /> <p>File size exceeds 5MB limit.</p></li>
                            }
                            {errors.acceptType &&
                                <li className="flex text-sm text-red-600 items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-red-600" /> <p>Only image files are allowed.</p></li>
                            }
                            {errors.resolution &&
                                <li className="flex text-sm text-red-600 items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-red-600" /> <p>Image must be {size}x{size} pixels.</p></li>
                            }
                        </ul>
                    }
                </div>
            )}
        </ImageUpload>
    );
};

export default AvatarUploader;