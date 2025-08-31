import type { Metadata } from "next";
import { Container } from "@/components/ui";

//Components
import Login from "@/components/account/Login";

export const metadata: Metadata = {
    title: "Login"
}

const Page = () => {
    return (
        <Container>
            <Login />
        </Container>
    );
};

export default Page;