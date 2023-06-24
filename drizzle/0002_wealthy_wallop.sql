CREATE TABLE IF NOT EXISTS "universes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"universe_id" integer,
	"api_key" text
);
