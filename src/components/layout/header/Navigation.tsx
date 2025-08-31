"use client"
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { Loading } from "@/components/ui";

//Components
import NavDrawer from "./NavDrawer";

//Trpc
import { trpc } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/auth/client";

const Navigation = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Initializing Hook
    const pathname = usePathname();

    //Trpc
    const [data] = trpc.users.getUser.useSuspenseQuery();
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

    //Effect
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <Fragment>
            <div className="justify-end items-center gap-6 text-white lg:flex xxs:hidden">
                {lists.map((item, i) => (
                    <Link href={item.path} key={i}>
                        {item.name}
                    </Link>
                ))}
                <button className="bg-c-purple px-4 py-1.5 rounded-lg relative" onClick={onLogout} disabled={isPending}>
                    <span className={`${isPending && "opacity-20"}`}>Logout</span>
                    {isPending &&
                        <div className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Loading />
                        </div>
                    }
                </button>
                <Link href={"/profile/me"}>
                    {data?.user.image ? <Image src={data.user.image} width={500} height={500} alt="profile-preview" className="w-[40px] h-[40px] rounded-full" /> : <Image src="/profile.jpg" width={500} height={500} alt="profile-preview" className="w-[40px] h-[40px] rounded-full" />}
                </Link>
            </div>
            <div className="lg:hidden xxs:block flex items-center justify-end">
                <button className="bg-c-purple text-white px-[14px]  py-2.5 rounded-lg relative" onClick={() => setOpen(true)}>
                    <IconMenu2 size={22} />
                </button>
            </div>
            <NavDrawer
                open={open}
                onClose={() => setOpen(false)}
            />
        </Fragment>
    );
};

export default Navigation;

const lists = [
    { path: "/wishlist", name: "Wishlist" },
    { path: "/movies/watch-list", name: "Watch List" },
    { path: "/movies/add-movies", name: "Add Movies" },
    { path: "/books/reading-list", name: "Reading List" },
    { path: "/books/add-books", name: "Add Books" },
]