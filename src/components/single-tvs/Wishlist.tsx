"use client"
import toast from "react-hot-toast";
import { Loading } from "../ui";
import { IconHeartFilled } from "@tabler/icons-react";

//Trpc
import { trpc } from "@/trpc/client";

//Interface
import { GetSingleTvTypes } from "@/server/tv/output/tv.output";
interface Props {
    items: GetSingleTvTypes;
}

const Wishlist = ({ items }: Props) => {
    //Trpc
    const utils = trpc.useUtils();
    const { data, isFetching } = trpc.movie.check.useQuery(String(items.id || ""));
    const { isPending, mutate } = trpc.movie.addWishlist.useMutation({
        onSuccess: (data) => {
            utils.movie.wishlist.invalidate();
            return utils.movie.check.refetch().finally(() => {
                toast.success(data.message);
            })
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    //Handler
    const onWishlistAdd = () => {
        const formData = {
            movieId: items.id.toString() as string,
            name: items.name,
            releaseDate: items.first_air_date,
            poster: items.poster_path,
            mediaType: "movie",
            action: "drop" as const
        }
        mutate(formData)
    }

    return (
        <div>
            <button className="w-10 h-10 rounded-full bg-main text-white flex  items-center justify-center" onClick={onWishlistAdd} disabled={isPending || isFetching}>
                {(isPending || isFetching) ? (
                    <Loading size={18} />
                ) : (
                    <IconHeartFilled className={`text-2xl ${data?.isWishlist ? "text-pink-600" : (data?.isWatch ? "text-green-600" : "")}`} />
                )}
            </button>
        </div>
    );
};

export default Wishlist;