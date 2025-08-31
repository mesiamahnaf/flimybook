import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

//Tables
import { user } from "./auth";

export const books = pgTable("book", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    writer: text("writer"),
    date: text("release_date"),
    totalPage: text("total_page"),
    totalDays: text("total_days"),
    type: text("type"),
    userId: uuid("user").references(() => user.id).notNull(),
    createdAt: timestamp("create_at").defaultNow()
})