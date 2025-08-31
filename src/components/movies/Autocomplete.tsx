"use client"
import { useState, useRef, useEffect } from "react";
import { Input } from "../ui";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Loading, Scroll, useKeyboardNavigation } from "../ui";

//Trpc
import { trpc } from "@/trpc/client";


//Interface
import { SearchResultData } from "@/server/movies/output/movie.output";
interface Props {
    errorMessage?: string;
    value: string;
    onChange: (selected: SearchResultData) => void;
    movieId?: string | number | null;
}

const Autocomplete = ({ errorMessage, value = "", onChange, movieId }: Props) => {
    //State
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState<boolean>(false);

    //Ref
    const triggerRef = useRef<HTMLButtonElement>(null);

    //Floating UI
    const { x, y, refs, strategy, context, } = useFloating({
        open: open,
        onOpenChange: setOpen,
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    })
    const click = useClick(context);
    const dismiss = useDismiss(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);


    // animation presets based on placement
    const initialMotion = {
        opacity: 0,
        scale: 0.95,
    }
    const animateMotion = { opacity: 1, scale: 1 };

    //Trpc
    const { data, isFetching } = trpc.movie.getSearch.useQuery(search);

    //Initializing Hook
    const { cursor, setCursor, ref } = useKeyboardNavigation<SearchResultData>(data?.results || [], (e) => {
        onChange(e);
        setOpen(false);
    }, open);

    useEffect(() => {
        setSearch(value);
    }, [value])

    return (
        <div className="relative">
            <Input
                {...getReferenceProps({
                    ref(node: Element | null) {
                        refs.setReference(node)
                        triggerRef.current = node as HTMLButtonElement
                    }
                })}
                label="Movie Name"
                id="movieName"
                placeholder="Movie Name"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onClick={() => setOpen(true)}
                errorMessage={errorMessage}
                autoComplete="off"
            />
            {typeof window !== "undefined" && createPortal(
                <AnimatePresence>
                    {open && data?.results.length !== 0 &&
                        <motion.div
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    position: strategy,
                                    top: y ?? 0,
                                    left: x ?? 0,
                                    width: triggerRef.current?.offsetWidth,
                                },
                                className: "z-[999999999999] bg-white border border-gray-200 rounded-lg overflow-hidden",
                                role: "listbox"
                            })}
                            initial={initialMotion}
                            animate={animateMotion}
                            exit={initialMotion}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            {isFetching &&
                                <div className="px-4 py-3">
                                    <Loading className="stroke-black" />
                                </div>
                            }
                            <Scroll className="max-h-[300px]" showAlways ref={ref}>
                                {data?.results.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`px-4 py-1.5 text-[15px] text-gray-700 select-none cursor-pointer relative ${item.id === movieId ? "bg-c-purple text-white" : cursor === i ? "bg-gray-100" : "hover:bg-gray-100"}`}
                                        onClick={() => (onChange(item), setCursor(i), setOpen(false))}
                                    >
                                        {item.original_name || item.original_title}  ({item.release_date?.toString().split("-")[0] || item.first_air_date?.toString().split("-")[0]}) - <span className="capitalize">{item.media_type}</span>
                                    </div>
                                ))}
                                {data?.results.length === 0 && (
                                    <p className="py-2 px-3 text-sm text-gray-600">
                                        No movies found
                                    </p>
                                )}
                            </Scroll>
                        </motion.div>
                    }
                </AnimatePresence>, document.body
            )}
        </div>
    );
};

export default Autocomplete;