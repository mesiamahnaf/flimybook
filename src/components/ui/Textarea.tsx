"use client"
import { TextareaHTMLAttributes, forwardRef } from "react";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

//Interface
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label?: string;
    errorMessage?: string;
    className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ label, errorMessage, className, id, ...props }, ref) => {
    return (
        <div className={errorMessage ? "mb-4" : "mb-0"}>
            {label &&
                <label htmlFor={id} className="text-strong mb-1.5 block text-[15px] text-left">{label}</label>
            }
            <div className="relative">
                <textarea
                    id={id}
                    ref={ref}
                    className={twMerge(`border border-solid bg-c-purple/5 rounded-md py-2.5 w-full text-[15px] text-gray-700 px-3 placeholder:text-gray-400 ${errorMessage ? "border-red-600 focus:outline-red-600" : "border-transparent focus:outline-c-purple"}`, className)}
                    {...props}
                />
            </div>
            <p className={`text-sm text-error mt-1 flex items-center gap-1 transition-all ${errorMessage ? "opacity-100 visible -translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                <IconAlertCircleFilled size={18} />
                <span>{errorMessage}</span>
            </p>
        </div>
    );
});

Textarea.displayName = "Textarea";

export default Textarea;