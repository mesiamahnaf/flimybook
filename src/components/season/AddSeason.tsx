"use client"
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Input, Loading, Container, Datepicker } from "../ui";

//Types
import { SeasonFormInput } from "@/server/movies/input/movie.input";

//Components
import Autocomplete from "./Autocomplete";

//Trpc
import { trpc } from "@/trpc/client";

const AddSeason = () => {
    //Form Initialize
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset
    } = useForm<SeasonFormInput>();

    //Trpc
    const utils = trpc.useUtils();
    const { isPending, mutate } = trpc.movie.addSeason.useMutation({
        onSuccess: (data) => {
            utils.movie.movieList.refetch();
            toast.success(data.message)
            reset();
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Submit
    const onSubmit: SubmitHandler<SeasonFormInput> = (value) => {
        mutate(value)
    }

    return (
        <Container className="py-20">
            <div className="grid grid-cols-3 xl:grid-cols-3 xxs:grid-cols-1 gap-10 px-20 lg:px-20 lsm:px-16 sm:px-3 xxs:px-2">
                <div className="col-span-2 xxs:max-xl:col-span-1">
                    <h4 className="text-4xl font-bold mb-10">Add season to watch list</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="tv"
                            rules={{ required: "Series name is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    onChange={onChange}
                                    value={value}
                                    errorMessage={errors.tv?.message}
                                />
                            )}
                        />
                        <Input
                            label="Season Name"
                            id="Season"
                            placeholder="Season Name"
                            {...register("season", { required: "Season name is required" })}
                            errorMessage={errors.season?.message}
                        />
                        <Controller
                            control={control}
                            name="releaseDate"
                            rules={{ required: "Release date is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Datepicker
                                    id="releaseDate"
                                    label="Release Date"
                                    value={value}
                                    onChange={onChange}
                                    errorMessage={errors.releaseDate?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="watchDate"
                            rules={{ required: "Watch date is required" }}
                            render={({ field: { onChange, value } }) => (
                                <Datepicker
                                    id="watchDate"
                                    label="Watch Date"
                                    value={value}
                                    onChange={onChange}
                                    errorMessage={errors.watchDate?.message}
                                />
                            )}
                        />
                        <Input
                            label="How many episode?"
                            id="episode"
                            {...register("totalEpisode", { required: "Episode number is required" })}
                            inputType="int"
                            placeholder="Episode Number"
                            errorMessage={errors.totalEpisode?.message}
                        />
                        <Input
                            label="How many day(s)?"
                            id="Days"
                            {...register("day", { required: "Please select how many day you " })}
                            placeholder="Total Days"
                            inputType="int"
                            errorMessage={errors.day?.message}
                        />
                        <div className="mb-1 relative">
                            <button className="w-full bg-gradient-to-r from-c-initial to-c-final rounded-xl py-6 text-lg text-white" type="submit" disabled={isPending}>
                                <span className={`${isPending && "opacity-20"}`}>Add Season</span>
                                {isPending &&
                                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
                                        <Loading size={35} />
                                    </div>
                                }
                            </button>
                        </div>
                        <Link href="/movies/add-movies" className="text-base  transition-all hover:text-indigo-900 hover:underline">
                            Switch to Movies
                        </Link>
                    </form>
                </div>
                <div></div>
            </div>
        </Container>
    );
};

export default AddSeason;