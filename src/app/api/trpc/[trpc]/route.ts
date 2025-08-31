import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

//App Router
import { appRouter } from "@/server";
import { createContext } from "@/server/trpc/context";

const handler = (req: NextRequest) => {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        req,
        createContext: createContext
    });
};

export { handler as GET, handler as POST };