"use client"
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Container, Input, Select, Loading, AvatarUploader } from "../ui";

//Types
import { UserUpdateFormInput } from "@/server/user/input/user.input";

//Trpc
import { trpc } from "@/trpc/client";

const EditProfile = () => {
    //Trpc
    const utils = trpc.useUtils();
    const [data] = trpc.users.getUser.useSuspenseQuery();
    const { isPending, mutate } = trpc.users.update.useMutation({
        onSuccess: (data) => {
            return utils.users.getUser.refetch().finally(() => {
                toast.success(data.message)
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<UserUpdateFormInput>({
        values: {
            name: data?.user.name || "",
            image: data?.user.image || "",
            profession: data?.user.profession || "",
            hobby: data?.user.hobby || "",
            favoriteGenre: data?.user.favoriteGenre || "",
            favoriteBookCategory: data?.user.favoriteBookCategory || ""
        }
    });

    //Submit
    const onSubmit: SubmitHandler<UserUpdateFormInput> = async (value) => {
        mutate(value)
    }

    return (
        <Container className="w-1/2 xl:w-1/2 xxs:w-full my-10">
            <div className="border border-solid border-indigo-900/10 rounded-md p-8 sm:p-8 xxs:p-4">
                <h4 className="text-lg font-semibold mb-3">Update your profile!</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <Controller
                            control={control}
                            name="image"
                            render={({ field: { onChange, value } }) => (
                                <AvatarUploader
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                    <Input
                        label="Name"
                        id="name"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                        errorMessage={errors.name?.message}
                    />
                    <Controller
                        control={control}
                        name="profession"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                label="Profession"
                                value={value}
                                onChange={(e) => onChange(e)}
                                options={["Student", "Teacher", "Businessman", "Doctor", "Programmer", "Doctor", "Artist", "Designer", "Writer", "Job holder", "Other"].map((a) => ({ value: a, label: a }))}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="hobby"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                label="Your hobby"
                                value={value}
                                onChange={(e) => onChange(e)}
                                options={hobbies.map(a => ({ value: a, label: a }))}
                            />
                        )}
                    />
                    <div className="relative w-max">
                        <button className="bg-gradient-to-r from-c-initial to-c-final relative text-white px-8 rounded-lg py-2" type="submit" disabled={isPending}>
                            <span className={`${isPending && "opacity-20"}`}>Save Profile</span>
                            {isPending &&
                                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    <Loading size={25} />
                                </div>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default EditProfile;


//Data
const hobbies = [
    "Reading",
    "Gaming",
    "Cooking",
    "Painting",
    "Photography",
    "Hiking",
    "Cycling",
    "Swimming",
    "Dancing",
    "Singing",
    "Writing",
    "Playing an Instrument",
    "Traveling",
    "Yoga",
    "Watching Movies",
    "Collecting",
    "Volunteering",
    "Gardening",
    "Fishing",
    "Knitting/Crocheting",
];