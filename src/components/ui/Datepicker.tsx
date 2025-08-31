"use client"
import { useState, useEffect, useRef } from "react";
import moment, { Moment } from "moment";
import { IconCalendarWeek, IconX, IconChevronLeft, IconChevronRight, IconAlertCircleFilled } from "@tabler/icons-react";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss, Placement } from "@floating-ui/react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

//Motions
const initialMotion = { opacity: 0, scale: 0.95 };
const animateMotion = { opacity: 1, scale: 1 };

interface CalendarDay {
    date: string;
    day: string;
    isCurrentMonth: boolean;
    isDisabled?: boolean;
}

type DateFormats = "YYYY-MM-DD" | "DD-MM-YYYY" | "MM-DD-YYYY" | "MMMM D, YYYY" | "D MMMM, YYYY" | "ddd, MMM D, YYYY" | "Do MMM YYYY" | "YYYY/MM/DD" | "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY.MM.DD" | "DD.MM.YYYY" | "dddd, MMMM Do YYYY";
type TimeFormats = "HH:mm" | "hh:mm A" | "h:mm A";

//Interface
interface Props {
    id: string;
    value: string;
    onChange: (e: string) => void;
    placeholder?: string;
    errorMessage?: string;
    label?: string;
    dateFormat?: DateFormats;
    timeFormat?: TimeFormats;
    minDate?: Date;
    maxDate?: Date;
    readonly?: boolean;
    className?: string;
    showTime?: boolean;
    placement?: Placement;
}

const Datepicker = ({ id, className, onChange, value, dateFormat, timeFormat, placeholder = "Select date", minDate, maxDate, label, errorMessage, readonly = false, showTime = false, placement = "bottom-start" }: Props) => {
    //State
    const [currentDate, setCurrentDate] = useState<Moment>(value ? moment(value) : moment());
    const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selector, setSelector] = useState<"year" | "month" | "date">("date");
    const [selectDate, setSelectDate] = useState<string>(moment(value).format("YYYY-MM-DD") ?? "");

    //Floating UI
    const { x, y, strategy, refs, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: placement,
        middleware: [offset(4), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    });
    const click = useClick(context)
    const dismiss = useDismiss(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

    //Ref
    const triggerRef = useRef<HTMLInputElement>(null);

    // Check if date is disabled
    const isDateDisabled = (date: Moment) => {
        if (minDate && date.isBefore(moment(minDate), "day")) {
            return true;
        }
        if (maxDate && date.isAfter(moment(maxDate), "day")) {
            return true;
        }
        return false;
    };

    // Generate calendar data with disabled dates
    const generateCalendarData = (date: Moment) => {
        const startOfMonth = date.clone().startOf("month").startOf("week");
        const endOfMonth = date.clone().endOf("month").endOf("week");
        const calendarDays: CalendarDay[] = [];
        const currentDay = startOfMonth.clone();

        while (currentDay.isBefore(endOfMonth)) {
            calendarDays.push({
                date: currentDay.format("YYYY-MM-DD"),
                day: currentDay.format("D"),
                isCurrentMonth: currentDay.isSame(date, "month"),
                isDisabled: isDateDisabled(currentDay)
            });
            currentDay.add(1, "day");
        }
        return calendarDays;
    };

    //Handler Previous
    const goToPreviousMonth = () => {
        if (selector === "date") {
            setCurrentDate(currentDate.clone().subtract(1, "month"))
        } else if (selector === "month") {
            setCurrentDate(currentDate.clone().subtract(1, "year"))
        } else if (selector === "year") {
            setCurrentDate(currentDate.clone().subtract(10, "year"))
        }
    };

    //Handler Next
    const goToNextMonth = () => {
        if (selector === "date") {
            setCurrentDate(currentDate.clone().add(1, "month"))
        } else if (selector === "month") {
            setCurrentDate(currentDate.clone().add(1, "year"))
        } else if (selector === "year") {
            setCurrentDate(currentDate.clone().add(10, "year"))
        }
    };

    //Handler Selector
    const onSelectorChange = () => {
        if (selector === "date") setSelector("year");
        if (selector === "month") setSelector("date");
        if (selector === "year") setSelector("month");
    }

    const onYearSelect = (year: number) => {
        setCurrentDate(currentDate.clone().year(year))
        setSelector("month")
    }
    const onMonthSelect = (month: number) => {
        setCurrentDate(currentDate.clone().month(month))
        setSelector("date")
    }

    const handleDateChange = (value: string) => {
        applySingleDateSelection(value);
    };
    const applySingleDateSelection = (date: string) => {
        onChange?.(date);
        setOpen(false);
    };

    const getDisplayValue = () => {
        if (!value) return "";

        if (showTime) {
            return moment(value).format(`${dateFormat || "ddd, DD MMM YYYY"} ${timeFormat || "HH:mm"}`);
        }
        return moment(value).format(dateFormat || "ddd, DD MMM YYYY");
    };

    useEffect(() => {
        setCalendarData(generateCalendarData(currentDate));

        if (value) {
            const dateMoment = moment(value);
            setSelectDate(dateMoment.format("YYYY-MM-DD"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDate, value, minDate, maxDate])

    return (
        <div className={`relative ${errorMessage ? "mb-4" : "mb-0"}`}>
            {label &&
                <label
                    htmlFor={id}
                    className="font-medium text-gray-700 mb-2 block text-[15px]"
                >
                    {label}
                </label>
            }
            <div className="relative">
                <input
                    {...getReferenceProps({
                        ref(node: Element | null) {
                            refs.setReference(node)
                            triggerRef.current = node as HTMLInputElement
                        },
                        id: id,
                        value: getDisplayValue(),
                        autoComplete: "off",
                        role: "presentation",
                        readOnly: true,
                        disabled: readonly,
                        type: "text",
                        placeholder: placeholder
                    })}
                    className={twMerge(`border border-solid bg-c-purple/5 rounded-md py-2.5 w-full text-[15px] cursor-pointer text-gray-700 px-3 placeholder:text-gray-400 ${errorMessage ? "border-red-600 focus:outline-red-600" : "border-transparent focus:outline-c-purple"}`, className)}
                />
                {!value &&
                    <span className="absolute top-1/2 right-5 pointer-events-none -translate-y-1/2 text-gray-600">
                        <IconCalendarWeek className="text-lg text-c-purple" />
                    </span>
                }
                {value &&
                    <button className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600 hover:bg-gray-200 p-1.5 rounded-md transition-all" type="button" onClick={() => {
                        setSelectDate("");
                        onChange("");
                    }}>
                        <IconX size={20} />
                    </button>
                }
            </div>
            {typeof window !== "undefined" && createPortal(
                <AnimatePresence>
                    {open &&
                        <motion.div
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    position: strategy,
                                    top: y ?? 0,
                                    left: x ?? 0,
                                    width: triggerRef.current?.offsetWidth,
                                    minWidth: 420,
                                    maxWidth: 450
                                },
                                className: "z-[99999] p-2 bg-white border border-gray-200 rounded-xl",
                                role: "listbox"
                            })}
                            initial={initialMotion}
                            animate={animateMotion}
                            exit={initialMotion}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            <div className="flex justify-between mb-3 items-center">
                                <button
                                    className="text-gray-600 font-bold py-1.5 px-2 rounded"
                                    onClick={goToPreviousMonth}
                                    type="button"
                                >
                                    <IconChevronLeft size={28} stroke={1.4} />
                                </button>
                                <div className="flex items-center justify-center">
                                    <button className="text-lg font-medium hover:bg-gray-100 px-2 py-px rounded-md transition-all" type="button" onClick={onSelectorChange}>
                                        {selector === "date" && currentDate.format("MMMM YYYY")}
                                        {selector === "month" && currentDate.format("YYYY")}
                                        {selector === "year" &&
                                            `${Math.floor(currentDate.year() / 10) * 10}-${Math.floor(currentDate.year() / 10) * 10 + 9}`}
                                    </button>
                                </div>
                                <button
                                    className="text-gray-600 font-bold py-1.5 px-2 rounded"
                                    onClick={goToNextMonth}
                                    type="button"
                                >
                                    <IconChevronRight size={28} stroke={1.4} />
                                </button>
                            </div>
                            {(selector === "month" || selector === "year") &&
                                <div>
                                    {selector === "year" &&
                                        <div className="grid grid-cols-4 gap-2">
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = Math.floor(currentDate.year() / 10) * 10 + i
                                                const isCurrentYear = year === moment().year()
                                                const isSelectedYear = year === currentDate.year()

                                                return (
                                                    <button
                                                        key={year}
                                                        type="button"
                                                        onClick={() => onYearSelect(year)}
                                                        className={`py-1.5 text-center rounded-lg transition-all ${isSelectedYear
                                                            ? "bg-c-purple text-white"
                                                            : isCurrentYear
                                                                ? "text-c-initial font-medium"
                                                                : "text-gray-600"
                                                            }`}
                                                    >
                                                        {year}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    }
                                    {selector === "month" &&
                                        <div className="grid grid-cols-3 gap-2">
                                            {moment.monthsShort().map((month, index) => {
                                                const isCurrentMonth = index === moment().month() && currentDate.year() === moment().year()
                                                const isSelectedMonth = index === currentDate.month()

                                                return (
                                                    <button
                                                        key={month}
                                                        type="button"
                                                        onClick={() => onMonthSelect(index)}
                                                        className={`py-1.5 text-center rounded-lg transition-all ${isSelectedMonth
                                                            ? "bg-c-purple text-white"
                                                            : isCurrentMonth
                                                                ? "text-c-initial font-medium"
                                                                : "text-gray-600"
                                                            }`}
                                                    >
                                                        {month}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            }
                            {selector === "date" &&
                                <div className="overflow-auto h-full w-full relative">
                                    <table className="w-full min-w-max table-auto text-left">
                                        <thead>
                                            <tr>
                                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                                    <th key={day} className="text-center text-gray-600 p-2 sm:p-2 xxs:p-1 sm:text-base xxs:text-sm">
                                                        {day}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(6)].map((_, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {[0, 1, 2, 3, 4, 5, 6].map((colIndex) => {
                                                        const index = rowIndex * 7 + colIndex;
                                                        const day = calendarData[index];
                                                        return (
                                                            <td
                                                                key={colIndex}
                                                                className={`select-none sm:text-base xxs:text-sm text-center p-2 sm:p-2 xxs:p-1 ${(minDate && moment(day?.date).isSameOrBefore(moment(minDate))) ? "cursor-default pointer-events-none line-through opacity-60" : "cursor-pointer"} ${!day?.isCurrentMonth ? "text-gray-400" : ""}`}
                                                                onClick={() => handleDateChange(day?.date || "")}
                                                            >
                                                                <div className={`${day?.date === selectDate ? `relative text-white z-10 after:w-9 after:h-9 after:absolute after:bg-c-purple after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-z-10 after:rounded-full` : ""} ${(day?.date !== selectDate && day?.date === moment().format("YYYY-MM-DD")) ? "text-c-initial" : ""}`}>
                                                                    {day?.day}
                                                                </div>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </motion.div>
                    }
                </AnimatePresence>, document.body
            )}
            <p className={`text-sm text-red-600 mt-1 flex items-center gap-1 transition-all ${errorMessage ? "opacity-100 visible -translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                <IconAlertCircleFilled size={18} />
                <span>{errorMessage}</span>
            </p>
        </div>
    );
};

export default Datepicker;