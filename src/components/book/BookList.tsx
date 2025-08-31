"use client"
import { useState } from "react";
import moment from "moment";
import { Loading } from "@/components/ui";
import { IconEdit, IconBook2, IconBook, IconCalendarWeekFilled, IconCategory } from "@tabler/icons-react";

//Trpc
import { trpc } from "@/trpc/client";

const BookList = () => {
    //State
    const [search, setSearch] = useState<string>("");

    //Trpc
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } = trpc.book.list.useInfiniteQuery({
        search: search,
        limit: 12
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: 1
    });

    return (
        <div className="mb-14">
            <div className="mt-3">
                <p className="text-lg font-medium mb-2">Search for!</p>
                <div className="w-1/2 lg:w-1/2 xxs:w-full relative">
                    <input
                        placeholder="চাঁদেরও কিছু বিষাদ ছিল..."
                        className="focus:outline-none border border-solid border-indigo-900/20 w-full py-2 px-3 rounded"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <div className="absolute top-1/2 right-5 -translate-y-1/2">
                        {isFetching &&
                            <Loading className="stroke-c-blue" />
                        }
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2 xxs:grid-cols-1">
                {data?.pages.flatMap(a => a.data).map((item) => (
                    <div className="my-2 col-start-1 bg-gradient-to-r from-c-purple/5 to-white border border-solid border-gradient p-2.5 relative group" key={item.id}>
                        <h3 className="text-lg font-bold mb-0.5 font-noto">{item.name}</h3>
                        <p className="text-base flex items-center gap-2">
                            <IconEdit size={20} className="inline text-c-purple" />
                            <span className="font-bold">Writer: </span>
                            <span>{item.writer}</span>
                        </p>
                        <p className="text-base flex items-center gap-2 mt-1">
                            <IconBook2 size={20} className="inline text-c-purple" />
                            <span className="font-bold">Read: </span>
                            <span>{moment(item.date).format("DD MMM YYYY")}</span>
                        </p>
                        <p className="text-base flex items-center gap-2 mt-1">
                            <IconBook size={20} className="text-lg inline text-c-purple" />
                            <span className="font-bold">Total page: </span>
                            <span>{item.totalPage} page(s)</span>
                        </p>
                        <p className="text-base flex items-center gap-2 mt-1">
                            <IconCalendarWeekFilled size={20} className="text-lg inline text-c-purple" />
                            <span className="font-bold">Total days: </span>
                            <span>{item.totalDays} day(s)</span>
                        </p>
                        <p className="text-base flex items-center gap-2 mt-1">
                            <IconCategory size={20} className="text-lg inline text-c-purple" />
                            <span className="font-bold">Type: </span>
                            <span>{item.type}</span>
                        </p>
                    </div>
                ))}
            </div>
            {hasNextPage &&
                <button className="bg-gradient-to-r from-indigo-50 via-white to-white border border-solid border-gradient text-base font-bold py-2 pl-2 pr-14 relative text-left" onClick={() => fetchNextPage()}>
                    Load more
                    <div className="absolute top-1/2 right-0 -translate-y-1/2">
                        {isFetchingNextPage &&
                            <Loading className="stroke-c-initial" />
                        }
                    </div>
                </button>
            }
        </div>
    );
};

export default BookList;