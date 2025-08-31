import { createTRPCReact } from "@trpc/react-query";

//App Router
import { AppRouter } from "@/server";

//Creating Client TRPC
export const trpc = createTRPCReact<AppRouter>({});