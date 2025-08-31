ALTER TABLE "movie" RENAME COLUMN "user" TO "user_id";--> statement-breakpoint
ALTER TABLE "book" RENAME COLUMN "user" TO "user_id";--> statement-breakpoint
ALTER TABLE "wishlist" RENAME COLUMN "user" TO "user_id";--> statement-breakpoint
ALTER TABLE "movie" DROP CONSTRAINT "movie_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "book" DROP CONSTRAINT "book_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "movie" ADD CONSTRAINT "movie_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book" ADD CONSTRAINT "book_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;