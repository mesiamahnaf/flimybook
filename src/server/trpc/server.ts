import { initTRPC, TRPCError } from "@trpc/server";

//Context
import { Context } from "./context";

//Initialize TRPC
const t = initTRPC.context<Context>().create();

//Router
export const router = t.router;

//Protected Procedure
export const procedure = t.procedure.use(
    async function isAuthed(opts) {
        const { session } = opts.ctx;
        if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized request" });
        return opts.next({
            ctx: {
                session
            }
        })
    }
);

//Public Procedure
export const publicProcedure = t.procedure;

//Caller Factory
export const createCallerFactory = t.createCallerFactory;