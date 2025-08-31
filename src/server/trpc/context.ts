import { auth } from "@/auth/server";
import { headers } from "next/headers";

export const createContext = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    return {
        session
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;