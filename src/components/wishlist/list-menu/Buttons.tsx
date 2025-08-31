"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import { IconEyePlus, IconTrash } from "@tabler/icons-react";

//Components
import AddToWatch from "./AddToWatch";
import Confirm from "./Confirm";

//Trpc
import { trpc } from "@/trpc/client";

//Interface
import { TWishlist } from "@/server/movies/output/movie.output";
interface Props {
    item: TWishlist;
}

const Buttons = ({ item }: Props) => {
    //State
    const [remove, setRemove] = useState<boolean>(false);
    const [watch, setWatch] = useState<boolean>(false);

    //Trpc
    const utils = trpc.useUtils();
    const { mutate, isPending } = trpc.movie.drop.useMutation({
        onSuccess: (data) => {
            return utils.movie.wishlist.refetch().finally(() => {
                setRemove(false)
                toast.success(data.message)
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return (
        <div className="flex gap-4 mt-2">
            <button className="text-xl text-indigo-900" onClick={() => setWatch(true)}>
                <IconEyePlus />
            </button>
            <AddToWatch
                open={watch}
                onClose={() => setWatch(false)}
                item={item}
            />
            <button className="text-lg text-red-600" onClick={() => setRemove(true)}>
                <IconTrash />
            </button>
            <Confirm
                open={remove}
                onClose={() => setRemove(false)}
                onConfirm={() => mutate(item.id)}
                fetching={isPending}
            />
        </div>
    );
};

export default Buttons;