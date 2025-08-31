import { defineRelations } from "drizzle-orm";

//Schemas
import * as schema from "../schemas";

export const relations = defineRelations(schema, (r) => ({
    seasons: {
        movie: r.one.movies({
            from: r.seasons.tv,
            to: r.movies.id
        })
    },
    movies: {
        tvs: r.many.seasons()
    },
}));