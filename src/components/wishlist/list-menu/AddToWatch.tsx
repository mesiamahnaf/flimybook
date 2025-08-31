import { useForm, SubmitHandler, Controller } from "react-hook-form";
import moment from "moment";
import { Dialog, Button, Datepicker } from "@/components/ui";
import toast from "react-hot-toast";

//Trpc
import { trpc } from "@/trpc/client";

//Interface
import { TWishlist } from "@/server/movies/output/movie.output";
interface Props {
    item: TWishlist;
    open: boolean;
    onClose: () => void;
}

interface Inputs {
    watchDate: string;
}

const AddToWatch = ({ open, onClose, item }: Props) => {
    //Form Initializing
    const {
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<Inputs>({
        defaultValues: {
            watchDate: moment().format("YYYY-MM-DD")
        }
    });

    //Trpc
    const utils = trpc.useUtils();
    const { mutate, isPending } = trpc.movie.addMovie.useMutation({
        onSuccess: (data) => {
            utils.movie.movieList.refetch();
            return utils.movie.wishlist.refetch().finally(() => {
                toast.success(data.message)
                onClose();
                reset();
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    //Handler -- Confirm
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            movieId: item.movieId as string,
            name: item.name as string,
            releaseDate: item.releaseDate as string,
            watchDate: value.watchDate as string,
            poster: item.poster as string,
            mediaType: item.mediaType as string,
            wishlistId: item.id
        }
        mutate(formData);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="w-[550px] p-6"
        >
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-1">Confirmation</h3>
                <p className="text-gray-600 font-medium">To add this {item.mediaType} to your watch list, please provide following information!</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="watchDate"
                    rules={{ required: "Watch date is required" }}
                    render={({ field: { onChange, value } }) => (
                        <Datepicker
                            id="datePicker"
                            value={value}
                            onChange={onChange}
                            errorMessage={errors.watchDate?.message}
                        />
                    )}
                />
                <div className="mt-6 flex gap-5 justify-center">
                    <button className="px-6 flex items-center justify-center focus:ring-0 border border-solid border-c-initial text-c-initial rounded-md" onClick={onClose} type="button">
                        <span>Cancel</span>
                    </button>
                    <Button
                        type="submit"
                        isPending={isPending}
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default AddToWatch;