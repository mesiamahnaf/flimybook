import { ChangeEvent } from "react";
import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

//Interface
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    errorMessage?: string;
    suffixIcon?: ReactNode;
    prefixIcon?: ReactNode;
    showError?: boolean;
    inputType?: "text" | "int" | "float-1" | "float-2" | "float-3" | "float-4" | "float-5";
    containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, errorMessage, id, className, prefixIcon, suffixIcon, showError = true, inputType = "text", containerClassName, ...rest }, ref) => {

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (inputType === "int") {
            value = value.replace(/[^0-9]/g, "").slice(0, 9);
        } else if (inputType.startsWith("float")) {
            const decimalPlaces = parseInt(inputType.split("-")[1] || "0", 10);
            const regex = new RegExp(`^\\d*(\\.\\d{0,${decimalPlaces}})?$`);
            if (!regex.test(value)) {
                value = value.slice(0, -1);
            }
        }

        e.target.value = value;
    };

    //Inputs
    const onInputProps = inputType !== "text" ? { onInput: handleInput } : {};

    return (
        <div className={twMerge(`${(errorMessage && showError) ? "mb-4" : "mb-0"}`, containerClassName)}>
            {label &&
                <label htmlFor={id} className="font-medium text-gray-700 mb-2 block text-[15px]">{label}</label>
            }
            <div className="relative">
                <input
                    id={id}
                    ref={ref}
                    className={twMerge(`border border-solid bg-c-purple/5 rounded-md py-2.5 w-full text-[15px] text-gray-700 ${prefixIcon ? "pl-12" : "pl-3"} ${suffixIcon ? "pr-12" : "pr-3"} placeholder:text-gray-400 ${errorMessage ? "border-red-600 focus:outline-red-600" : "border-transparent focus:outline-c-purple"}`, className)}
                    {...onInputProps}
                    {...rest}
                />
                {prefixIcon &&
                    <div className="absolute top-0 left-0 bottom-0 flex items-center justify-center px-3 text-gray-600">
                        {prefixIcon}
                    </div>
                }
                {suffixIcon &&
                    <div className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-3 text-gray-600">
                        {suffixIcon}
                    </div>
                }
            </div>
            {showError &&
                <p className={`text-sm text-red-600 mt-1 flex items-center gap-1 transition-all ${errorMessage ? "opacity-100 visible -translate-y-0" : "opacity-0 invisible -translate-y-1"}`}>
                    <IconAlertCircleFilled size={18} />
                    <span>{errorMessage}</span>
                </p>
            }
        </div>
    );
});

Input.displayName = "Input"

export default Input;