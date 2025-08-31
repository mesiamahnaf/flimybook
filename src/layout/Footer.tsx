"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import { Container } from "@/components/ui";

const Footer = () => {
    // Initialize Hook
    const pathname = usePathname();

    if (pathname.startsWith("/account")) return null;

    return (
        <footer className="mt-20 pb-8">
            <Container>
                <div className="text-center">
                    <Image src="/logo.png" width={1000} height={752} alt="logo" className="w-[120px] mx-auto" />
                    <h4 className="mt-4 text-2xl font-bold bg-gradient-to-r from-c-initial  to-c-final w-max mx-auto text-transparent bg-clip-text">Flimybook</h4>
                    <p className="mt-1 text-sm font-light">A personal movie and book collection.</p>
                    <div className="bg-gradient-to-r from-c-initial  to-c-final w-full h-[20px] rounded-md mt-6" />
                    <p className="mt-3 text-gray-600">©{moment().format("YYYY")} Flimybook. All right reserved!</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;