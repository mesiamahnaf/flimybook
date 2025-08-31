"use client"
import { useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query";
import { splitLink, httpBatchStreamLink, httpBatchLink } from "@trpc/client";

//Client
import { trpc } from "./client";

//Query Client
import { makeQueryClient } from "./query-client";

let clientQueryClientSingleton: QueryClient;

const getQueryClient = () => {
    if (isServer) {
        return makeQueryClient();
    }
    return (clientQueryClientSingleton ??= makeQueryClient());
}

const getUrl = () => {
    const base = (() => {
        if (typeof window !== "undefined") return "";
        if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
        return "http://localhost:3001";
    })();
    return `${base}/api/trpc`;
}

const TRPCProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                splitLink({
                    condition: (op) => ["users.verifyEmail", "users.login"].includes(op.path),
                    true: httpBatchLink({
                        url: getUrl()
                    }),
                    false: httpBatchStreamLink({
                        url: getUrl()
                    })
                })
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default TRPCProvider;