"use client"
import { useState, useEffect, useRef } from "react";

export const useKeyboardNavigation = <T,>(
    list: T[],
    onSelect: (e: T) => void,
    isOpen: boolean
) => {
    const [cursor, setCursor] = useState<number>(-1);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isOpen) {
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setCursor((prev) => (prev < list.length - 1 ? prev + 1 : prev));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setCursor((prev) => (prev > 0 ? prev - 1 : prev));
                    break;
                case "Enter":
                    e.preventDefault();
                    if (cursor >= 0 && cursor < list.length) {
                        onSelect(list[cursor]);
                    }
                    break;
            }
        }
    };

    useEffect(() => {
        if (ref.current && cursor >= 0) {
            const optionElement = ref.current.children[cursor] as HTMLElement;
            optionElement?.scrollIntoView({ block: "nearest" });
        }
    }, [cursor]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor, list, isOpen]);

    return { cursor, setCursor, ref };
};
