import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

//Tables
import { movies } from "./movies";

export const seasons = pgTable("season", {
    id: uuid("id").primaryKey().defaultRandom(),
    season: text("movie_id"),
    releaseDate: text("release_date"),
    watchDate: text("watch_date"),
    totalEpisode: text("total_episode"),
    day: text("poster"),
    tv: uuid("tv").references(() => movies.id).notNull(),
    createdAt: timestamp("create_at").defaultNow()
});