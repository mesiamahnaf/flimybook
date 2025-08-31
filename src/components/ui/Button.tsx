import { ReactNode, ButtonHTMLAttributes } from "react";
import Loading from "./Loading";
import { twMerge } from "tailwind-merge";

//Interface
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isPending?: boolean;
    children?: ReactNode;
    className?: string;
    loadingClassName?: string;
    loadingSize?: number;
}

const Button = ({ children, className = "", loadingClassName = "stroke-white", loadingSize = 22, isPending = false, disabled, ...rest }: Props) => {
    return (
        <button className={twMerge("bg-gradient-to-tr from-c-initial to-c-final px-6 py-2.5 rounded-xl text-gray-100 relative font-medium", className)} disabled={isPending || disabled} {...rest}>
            <span className={`${isPending && "opacity-20"}`}>{children}</span>
            {isPending &&
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Loading className={loadingClassName} size={loadingSize} />
                </div>
            }
        </button>
    );
};

export default Button;