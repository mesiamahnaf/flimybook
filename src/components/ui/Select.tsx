"use client";
import { useRef } from "react";
import { IconX, IconAlertCircleFilled, IconChevronDown } from "@tabler/icons-react";
import { useListNavigation, TListType } from "./useListNavigation";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import Scroll from "./Scroll";
import Loading from "./Loading";

// Interface
interface Props {
    onChange: (e: string) => void;
    value: string;
    label?: string;
    options?: TListType;
    errorMessage?: string;
    placeholder?: string;
    className?: string;
    showError?: boolean;
    emptyMessage?: string;
    isLoading?: boolean;
    showCloseIcon?: boolean;
}

const Select = ({ label, options = [], onChange, value = "", errorMessage, placeholder = "Select Opt..", className, showError = true, emptyMessage = "Nothing found", isLoading, showCloseIcon = true }: Props) => {
    //Initializing List Navigation
    const { isOpen, setIsOpen, selected, search, list, onSelect, cursor, ref } = useListNavigation({ list: options, onChange, value });

    //Ref
    const triggerRef = useRef<HTMLButtonElement>(null);

    //Floating UI
    const { x, y, refs, strategy, context, } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
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
    const animateMotion = { opacity: 1, scale: 1 }

    return (
        <div className={`${errorMessage ? "mb-4" : "mb-0"}`}>
            {label &&
                <label className="font-medium text-gray-700 mb-2 block text-[15px]">
                    {label}
                </label>
            }
            <div className="relative">
                <button
                    {...getReferenceProps({
                        ref(node: Element | null) {
                            refs.setReference(node)
                            triggerRef.current = node as HTMLButtonElement
                        },
                        type: "button"
                    })}
                    className={twMerge(`border border-solid bg-c-purple/5 cursor-pointer rounded-md px-3 text-[15px] w-full text-gray-700 text-left py-2.5 ${errorMessage ? "border-red-600 focus:outline-red-600 focus:outline-2 focus:border-transparent" : "border-transparent focus:outline-c-purple focus:outline-2 focus:border-transparent"}`, className)}
                >
                    <span className={`${selected?.value ? "text-gray-700" : "text-gray-400"}`}>{selected?.value ? selected.label : placeholder}</span>
                </button>
                <button
                    className={`absolute top-0 right-0 bottom-0 px-2 flex justify-center items-center rounded-e-md transition-all ${isOpen ? "rotate-180" : ""} ${selected?.value && showCloseIcon ? "cursor-pointer" : "pointer-events-none"}`}
                    onClick={() => onChange("")}
                    type="button"
                >
                    {selected?.value && showCloseIcon ?
                        <IconX className="text-gray-700" size={20} /> : <IconChevronDown className="text-gray-700" />
                    }
                </button>
            </div>
            {typeof window !== "undefined" && createPortal(
                <AnimatePresence>
                    {isOpen &&
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
                            {isLoading &&
                                <div className="px-2 py-2">
                                    <Loading />
                                </div>
                            }
                            {search && (
                                <div className="px-2 py-1 text-white text-xs w-max rounded-br-md bg-c-purple">
                                    Searching: {search}
                                </div>
                            )}
                            <Scroll className="max-h-[300px]" showAlways ref={ref}>
                                {list.map((item, i) => (
                                    <div key={i} className={`px-4 py-1.5 text-[15px] text-gray-700 select-none cursor-pointer relative ${item.value === value ? "bg-c-purple text-white" : "hover:bg-gray-100"} ${cursor === i ? "bg-gray-100" : ""}`} onClick={() => onSelect(i)}>
                                        {item.label}
                                    </div>
                                ))}
                                {list.length === 0 && (
                                    <p className="py-2 px-3 text-sm text-gray-600">{emptyMessage}</p>
                                )}
                            </Scroll>
                        </motion.div>
                    }
                </AnimatePresence>, document.body
            )}
            {showError &&
                <p className={`text-sm text-red-600 mt-1 flex items-center gap-1 transition-all ${errorMessage ? "opacity-100 visible -translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                    <IconAlertCircleFilled size={18} />
                    <span>{errorMessage}</span>
                </p>
            }
        </div>
    );
};

export default Select;