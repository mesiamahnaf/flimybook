import { ReactNode, forwardRef } from "react";

interface ScrollWrapperProps {
    children: ReactNode;
    className?: string;
    showAlways?: boolean;
}

const Scroll = forwardRef<HTMLDivElement, ScrollWrapperProps>(
    ({ children, className = "", showAlways = false }, ref) => {
        const colorClass = showAlways
            ? "[&::-webkit-scrollbar-thumb]:bg-gray-200"
            : "[&::-webkit-scrollbar-thumb]:bg-transparent";

        return (
            <div
                ref={ref}
                className={`overflow-auto ${className} [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent ${colorClass} [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300`}
            >
                {children}
            </div>
        );
    }
);

Scroll.displayName = "ScrollWrapper";

export default Scroll;