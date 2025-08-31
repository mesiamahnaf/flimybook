"use client";
import { Fragment, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    placement?: "left" | "right";
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const getDrawerVariants = (side: "left" | "right") => ({
    hidden: { x: side === "left" ? "-100%" : "100%" },
    visible: { x: 0 },
    exit: { x: side === "left" ? "-100%" : "100%" },
});

const Drawer = ({
    open,
    onClose,
    children,
    className,
    placement = "left",
}: Props) => {
    const drawerVariants = getDrawerVariants(placement);
    const sideClass = placement === "left" ? "left-0" : "right-0";

    return (
        <AnimatePresence>
            {open && (
                <Fragment>
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-[9999]"
                        onClick={onClose}
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.15 }}
                    />
                    <motion.div
                        className={twMerge(
                            "fixed top-0 h-screen overflow-auto bg-white z-[99999]",
                            sideClass,
                            className
                        )}
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                    >
                        {children}
                    </motion.div>
                </Fragment>
            )}
        </AnimatePresence>
    );
};

export default Drawer;