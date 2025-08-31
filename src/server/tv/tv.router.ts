import { z } from "zod";
import { procedure, router } from "@/server/trpc/server";

//Services
import { TvService } from "./tv.service";
const tvService = new TvService();

export const tvRouter = router({
    trendingTvs: procedure.query(() => {
        return tvService.trendingTvs();
    }),
    singleTv: procedure.input(z.number()).query(({ input }) => {
        return tvService.singleTv(input);
    }),
    getCast: procedure.input(z.number()).query(({ input }) => {
        return tvService.getCast(input);
    }),
});