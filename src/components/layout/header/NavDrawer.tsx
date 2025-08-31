import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Drawer, Loading } from "@/components/ui";

//trpc
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/auth/client";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
}

const NavDrawer = ({ open, onClose }: Props) => {
    //Tanstack
    const { isPending, mutate } = useMutation({
        mutationFn: async () => {
            const { error } = await authClient.signOut();
            if (error) throw new Error(error.message);
            return { success: true };
        },
        onSuccess: () => {
            toast.success("User logged out.")
            window.location.href = "/account/login"
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    const onLogout = () => {
        mutate()
    }

    return (
        <Drawer
            open={open}
            onClose={onClose}
            placement="left"
        >
            <div className="px-6 py-5">
                <Image src="/logo.png" width={1000} height={752} alt="Logo" className="w-[130px] mx-auto" />
                <h4 className="mt-4 text-2xl font-bold bg-gradient-to-r from-c-initial  to-c-final w-max mx-auto text-transparent bg-clip-text">Flimybook</h4>
                <div className="justify-end items-center gap-6 mt-12">
                    {lists.map((item, i) => (
                        <Link href={item.path} key={i} className="block my-2.5">
                            {item.name}
                        </Link>
                    ))}
                    <button className="bg-c-purple w-full mt-5 text-white px-4 py-1.5 rounded-lg relative" onClick={onLogout} disabled={isPending}>
                        <span className={`${isPending && "opacity-20"}`}>Logout</span>
                        {isPending &&
                            <div className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Loading />
                            </div>
                        }
                    </button>
                </div>
            </div>
        </Drawer>
    );
};

export default NavDrawer;


const lists = [
    { path: "/wishlist", name: "Wishlist" },
    { path: "/movies/watch-list", name: "Watch List" },
    { path: "/movies/add-movies", name: "Add Movies" },
    { path: "/books/reading-list", name: "Reading List" },
    { path: "/books/add-books", name: "Add Books" },
    { path: "/profile/me", name: "My  Profile" },
]