import Link from "next/link";

const WishlistHeader = () => {
    return (
        <div>
            <div className="bg-[url(/movie-banners.png)] bg-cover bg-center text-white py-9 px-10 relative rounded-xl overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-4xl font-bold mb-1">Wishlist</h3>
                    <h6 className="text-lg font-medium">You are waiting for!</h6>
                </div>
                <div className="absolute left-0 top-0 w-full h-full bg-c-purple/60" />
            </div>
            <div className="text-left">
                <Link href="/wishlist/add-wishlist" className="bg-gradient-to-r from-c-initial to-c-final px-6 py-2 rounded-lg block mt-5 w-max text-white">
                    New Wishlist
                </Link>
            </div>
        </div>
    );
};

export default WishlistHeader;