"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui";

//Components
import Logo from "@/components/layout/header/Logo";
import Navigation from "@/components/layout/header/Navigation";

const Header = () => {
    // Initialize Hook
    const pathname = usePathname();

    //State
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    //Effect
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (lastScrollY - currentScrollY > 10) {
                setShowHeader(true);
            } else if (currentScrollY - lastScrollY > 10) {
                setShowHeader(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    if (pathname.startsWith("/account")) return null;

    return (
        <header className={`fixed top-0 left-0 w-full z-30 transition-all ${showHeader ? "translate-y-0" : "-translate-y-[100px]"}`}>
            <Container className="mt-3">
                <div className="bg-[url(/header.jpg)] bg-top py-2 px-6 rounded-xl relative overflow-hidden">
                    <div className="flex relative items-center z-10">
                        <Logo />
                        <Navigation />
                    </div>
                    <div className="bg-c-initial/70 absolute top-0 left-0 w-full h-full" />
                </div>
            </Container>
        </header>
    );
};

export default Header;
