"use client"
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";
import { Input, Container, Loading } from "../ui";

//Components
import Autocomplete from "../movies/Autocomplete";

//Types
import { WishlistFormInput } from "@/server/movies/input/movie.input";
import { SearchResultData } from "@/server/movies/output/movie.output";

//Trpc
import { trpc } from "@/trpc/client";

const AddWishlist = () => {
    //State
    const [selected, setSelected] = useState<SearchResultData>();

    //Form Initialize
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
        control,
        reset
    } = useForm<WishlistFormInput>();

    //Trpc
    const utils = trpc.useUtils();
    const { isPending, mutate } = trpc.movie.addWishlist.useMutation({
        onSuccess: (data) => {
            utils.movie.wishlist.refetch().finally(() => {
                toast.success(data.message);
                reset();
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    //Submit
    const onSubmit: SubmitHandler<WishlistFormInput> = (value) => {
        const formData = {
            movieId: selected?.id.toString() as string,
            name: value.name,
            releaseDate: value.releaseDate,
            poster: value.poster,
            mediaType: value.mediaType,
        }
        mutate(formData)
    }

    //Handler
    const onSelectHandler = (item: SearchResultData) => {
        setSelected(item);
        setValue("releaseDate", item.release_date?.toString() as string || item.first_air_date?.toString() as string);
        setValue("name", item.original_name as string || item.original_title as string);
        setValue("poster", item.poster_path as string);
        setValue("mediaType", item.media_type);
    }

    return (
        <Container className="py-32">
            <div className="grid grid-cols-3 xl:grid-cols-3 xxs:grid-cols-1 gap-8 px-20 lg:px-20 lsm:px-16 sm:px-3 xxs:px-2">
                <div className="col-span-2 xxs:max-xl:col-span-1">
                    <h4 className="text-4xl font-bold mb-10">Add Movies to wishlist</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <Controller
                                control={control}
                                name="name"
                                rules={{ required: "Name is required" }}
                                render={({ field: { value } }) => (
                                    <Autocomplete
                                        onChange={onSelectHandler}
                                        value={value}
                                        errorMessage={errors.name?.message}
                                        movieId={selected?.id}
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Release Date"
                                id="releaseDate"
                                placeholder="Release Date"
                                readOnly
                                {...register("releaseDate", { required: "Release date is required." })}
                                errorMessage={errors.releaseDate?.message}
                            />
                        </div>
                        <div>
                            <Input
                                label="Media type"
                                id="mediaType"
                                readOnly
                                placeholder="Media Type"
                                {...register("mediaType", { required: "Media type is required." })}
                                errorMessage={errors.mediaType?.message}
                                className="capitalize"
                            />
                        </div>
                        <div className="mt-6">
                            <div className="mb-2">
                                <button className="w-full bg-gradient-to-r from-c-initial to-c-final py-6 text-lg rounded-xl text-white relative" type="submit" disabled={isPending}>
                                    <span className={`${isPending && "opacity-20"}`}>Add Movie</span>
                                    {isPending &&
                                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
                                            <Loading size={35} />
                                        </div>
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <Image
                        src={watch().poster ? (process.env.NEXT_PUBLIC_MOVIE_API_IMAGE + watch().poster) : "/preview.png"}
                        alt="Preview"
                        width={880}
                        height={1320}
                        className={`rounded-xl block w-full h-full object-cover object-center transition-opacity border border-solid ${errors.poster ? "border-red-600" : "border-transparent"}`}
                    />
                </div>
            </div>
        </Container>
    );
};

export default AddWishlist;
