"use client"
import { useState, useEffect, useRef, useCallback } from "react";

//Interface
export type TListType = { value: string, label: string }[];

interface Props {
    list: TListType;
    onChange?: (e: string) => void;
    onMultiChange?: (e: string[]) => void;
    onSearchChange?: (e: string) => void;
    value: string | string[];
    isMulti?: boolean;
}

type UseListNavigationReturn<T extends boolean> = {
    cursor: number;
    setCursor: React.Dispatch<React.SetStateAction<number>>;
    ref: React.RefObject<HTMLDivElement | null>;
    isOpen: boolean | undefined;
    setIsOpen: (value: boolean) => void;
    selected: T extends true
    ? { value: string; label: string }[]
    : { value: string; label: string } | undefined;
    search: string;
    list: TListType;
    onSelect: (index: number) => void;
};

export function useListNavigation<T extends boolean = false>({
    list,
    onChange,
    onMultiChange,
    isMulti = false as T,
    value,
    onSearchChange
}: Props & { isMulti?: T }): UseListNavigationReturn<T> {
    //State
    const [cursor, setCursor] = useState<number>(-1);
    const [isOpen, setIsOpen] = useState<boolean>();
    const [search, setSearch] = useState<string>("");
    //Ref
    const ref = useRef<HTMLDivElement | null>(null);

    //Handler
    const filteredList = list.filter((o) => {
        const label = o.label.toLowerCase();
        const searchValue = search.toLowerCase();
        return label.includes(searchValue);
    });

    const getSelectedValues = useCallback((): UseListNavigationReturn<T>['selected'] => {
        if (isMulti) {
            // For multi-select, filter the list to find all selected items
            const valueArray = Array.isArray(value) ? value : value ? [value] : [];
            return list.filter((o) => valueArray.includes(o.value)) as UseListNavigationReturn<T>['selected'];
        }
        // For single-select, find the first matching item
        const valueString = Array.isArray(value) ? value[0] : value;
        return list.find((o) => o.value === valueString) as UseListNavigationReturn<T>['selected'];
    }, [value, isMulti, list]);

    const selected = getSelectedValues();

    //Handler
    const onSelect = (index: number) => {
        setIsOpen(false);
        setCursor(index);
        const opt = filteredList[index];
        if (isMulti) {
            const currentValues = Array.isArray(value) ? value : value ? [value] : [];
            const newValues = currentValues.includes(opt?.value || "") ? currentValues.filter(v => v !== opt?.value) : [...currentValues, opt?.value || ""];
            onMultiChange?.(newValues);
        } else {
            onChange?.(opt?.value || "");
        }
        setSearch("");
    }

    const onToggle = (value: boolean) => {
        setIsOpen(value);
        if (!value) {
            setSearch("");
            setCursor(-1);
        }
    }

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isOpen) {
            switch (e.key) {
                case "Escape":
                    e.preventDefault()
                    setIsOpen(false)
                    setCursor(-1)
                    setSearch("");
                    break
                case "ArrowDown":
                    e.preventDefault();
                    setCursor((prev) => (prev < filteredList.length - 1 ? prev + 1 : 0));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setCursor((prev) => (prev > 0 ? prev - 1 : filteredList.length - 1));
                    break;
                case "Enter":
                    e.preventDefault();
                    if (cursor >= 0 && cursor < filteredList.length) {
                        const opt = filteredList[cursor];
                        if (isMulti) {
                            const currentValues = Array.isArray(value) ? value : value ? [value] : [];
                            const newValues = currentValues.includes(opt?.value || "") ? currentValues.filter(v => v !== opt?.value) : [...currentValues, opt?.value || ""];
                            onMultiChange?.(newValues);
                        } else {
                            onChange?.(opt?.value || "");
                        }
                        setSearch("");
                        setIsOpen(false);
                    }
                    break;
                case "Tab":
                    setIsOpen(false);
                    setCursor(-1);
                    setSearch("")
                    break;
                default:
                    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                        e.preventDefault()
                        const newTerm = search + e.key.toLowerCase()
                        setSearch(newTerm);
                        onSearchChange?.(newTerm);
                        const idx = filteredList.findIndex((o) =>
                            o.label.toLowerCase().startsWith(newTerm)
                        )
                        if (idx >= 0) setCursor(idx)
                    } else if (e.key === "Backspace") {
                        e.preventDefault()
                        const newTerm = search.slice(0, -1)
                        setSearch(newTerm);
                        onSearchChange?.(newTerm);
                        const idx = filteredList.findIndex((o) =>
                            o.label.toLowerCase().startsWith(newTerm)
                        )
                        if (idx >= 0) setCursor(idx);
                    }
                    break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, cursor, filteredList, onChange, search, isMulti, value]);

    useEffect(() => {
        if (isOpen && ref.current && cursor >= 0) {
            const optionElement = ref.current.children[cursor] as HTMLElement;
            optionElement?.scrollIntoView({ block: "nearest" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isOpen, handleKeyDown]);

    return {
        cursor,
        setCursor,
        ref,
        isOpen,
        setIsOpen: onToggle,
        selected,
        search,
        list: filteredList,
        onSelect
    };
}