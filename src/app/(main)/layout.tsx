//Header
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

//Trpc
import { trpc, HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Layout = ({ children }: LayoutProps<"/">) => {
    //Void
    trpc.users.getUser.prefetch();

    return (
        <HydrateClient>
            <main>
                <Header />
                {children}
                <Footer />
            </main>
        </HydrateClient>
    );
};

export default Layout;