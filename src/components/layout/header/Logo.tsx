import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <div className="flex-1">
            <Link href={"/"}>
                <Image src="/logo.png" width={1000} height={752} alt="Flimybook" className="w-[65px]" />
            </Link>
        </div>
    );
};

export default Logo;