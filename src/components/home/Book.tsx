"use client"
import Link from "next/link";

//Trpc
import { trpc } from "@/trpc/client";

const Book = () => {
    //Trpc
    const [data] = trpc.users.count.useSuspenseQuery();

    return (
        <Link href="/books/reading-list" className="overflow-hidden p-7 rounded-xl bg-[url(/book.jpg)] bg-center text-white relative">
            <div className="relative z-10">
                <h3 className="text-3xl font-medium mb-1">Books</h3>
                <p className="text-base mb-3">Total books {data.bookCount}</p>
                <p className="text-xs font-light">Your books dashboard</p>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-c-purple/85" />
        </Link>
    );
};

export default Book;