import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

//Tables
import { user } from "./auth";

export const movies = pgTable("movie", {
    id: uuid("id").primaryKey().defaultRandom(),
    movieId: text("movie_id"),
    name: text("name"),
    releaseDate: text("release_date"),
    watchDate: text("watch_date"),
    poster: text("poster"),
    mediaType: text("media_type"),
    userId: uuid("user_id").references(() => user.id).notNull(),
    createdAt: timestamp("create_at").defaultNow()
})