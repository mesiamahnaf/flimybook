"use client"
import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";
import { Input, Container, Loading, Datepicker } from "../ui";

//Types
import { MoviesFormInput } from "@/server/movies/input/movie.input";
import { SearchResultData } from "@/server/movies/output/movie.output";

//Components
import Autocomplete from "./Autocomplete";

//Trpc
import { trpc } from "@/trpc/client";

const AddMovies = () => {
    //State
    const [selected, setSelected] = useState<SearchResultData>();

    //Form Initialize
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        control,
        reset
    } = useForm<MoviesFormInput>();


    //Trpc
    const utils = trpc.useUtils();
    const { isPending, mutate } = trpc.movie.addMovie.useMutation({
        onSuccess: (data) => {
            utils.movie.movieList.refetch();
            utils.users.count.refetch();
            toast.success(data.message)
            reset();
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    //Submit
    const onSubmit: SubmitHandler<MoviesFormInput> = (value) => {
        const formData = {
            movieId: selected?.id.toString() as string,
            name: value.name,
            releaseDate: value.release_date,
            watchDate: value.watch_date,
            poster: value.poster,
            mediaType: value.media_type
        }
        mutate(formData)
    }

    //Handler
    const onSelectHandler = (item: SearchResultData) => {
        setSelected(item);
        setValue("release_date", item.release_date?.toString() as string || item.first_air_date?.toString() as string);
        setValue("name", item.original_name as string || item.original_title as string);
        setValue("poster", item.poster_path as string);
        setValue("media_type", item.media_type);
    }

    return (
        <Container className="py-32">
            <div className="grid grid-cols-3 xl:grid-cols-3 xxs:grid-cols-1 gap-8 px-20 lg:px-20 lsm:px-16 sm:px-3 xxs:px-2">
                <div className="col-span-2 xxs:max-xl:col-span-1">
                    <h4 className="text-4xl font-bold mb-10">Add Movies to watch list</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: "Name is required" }}
                            render={({ field: { value } }) => (
                                <Autocomplete
                                    onChange={onSelectHandler}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />
                        <Input
                            label="Release Date"
                            id="releaseDate"
                            placeholder="Release Date"
                            readOnly
                            {...register("release_date", { required: "Release date is required." })}
                            errorMessage={errors.release_date?.message}
                        />
                        <Controller
                            control={control}
                            name="watch_date"
                            rules={{ required: "Watch date is required" }}
                            render={({ field: { value, onChange } }) => (
                                <Datepicker
                                    id="datePicker"
                                    label="Watch Date"
                                    value={value}
                                    onChange={onChange}
                                    errorMessage={errors.watch_date?.message}
                                />
                            )}
                        />
                        <Input
                            label="Media type"
                            id="mediaType"
                            readOnly
                            placeholder="Media Type"
                            {...register("media_type", { required: "Media type is required." })}
                            className="capitalize"
                            errorMessage={errors.media_type?.message}
                        />
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
                            <Link href="/movies/add-season" className="text-base  transition-all block hover:text-c-initial hover:underline">
                                Switch to Season
                            </Link>
                        </div>
                    </form>
                </div>
                <div>
                    <Controller
                        control={control}
                        name="poster"
                        rules={{ required: "Poster is required" }}
                        render={({ field: { value } }) => (
                            <Image
                                src={value ? (process.env.NEXT_PUBLIC_MOVIE_API_IMAGE + value) : "/preview.png"}
                                alt="Preview"
                                width={880}
                                height={1320}
                                className={`rounded-xl block w-full h-full object-cover object-center transition-opacity border border-solid ${errors.poster ? "border-red-600" : "border-transparent"}`}
                            />
                        )}
                    />
                </div>
            </div>
        </Container>
    );
};

export default AddMovies;
