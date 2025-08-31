import type { Metadata } from "next";
import { Container } from "@/components/ui";

//Components
import Register from "@/components/account/Register";

export const metadata: Metadata = {
    title: "Create new account"
}

const Page = () => {
    return (
        <Container>
            <Register />
        </Container>
    );
};

export default Page;