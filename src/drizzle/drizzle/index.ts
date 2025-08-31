import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

//Schemas
import { relations } from "../relations";

const sql = neon(process.env.DATABASE_URL!);

//Creating Drizzle DB
export const db = drizzle({ client: sql, relations });
