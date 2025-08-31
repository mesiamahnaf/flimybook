import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { headers } from "next/headers";

//Query Client
import { makeQueryClient } from "./query-client";

//App router
import { appRouter } from "@/server";
import { createCallerFactory } from "@/server/trpc/server";

//Auth
import { auth } from "@/auth/server";

//Context Types
import type { Context } from "@/server/trpc/context";

//Server Context
const createContext = cache(async (): Promise<Context> => {
    const session = await auth.api.getSession({ headers: await headers() });
    return {
        session: session
    }
})

//Caching client and creating caller
export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createContext);

//Server Caller
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
    caller,
    getQueryClient,
);