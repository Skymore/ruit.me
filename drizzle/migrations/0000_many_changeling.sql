CREATE TYPE "public"."type" AS ENUM('blog', 'snippet');--> statement-breakpoint
CREATE TABLE "stats" (
	"type" "type" NOT NULL,
	"slug" varchar(255) NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"loves" integer DEFAULT 0 NOT NULL,
	"applauses" integer DEFAULT 0 NOT NULL,
	"ideas" integer DEFAULT 0 NOT NULL,
	"bullseyes" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "stats_type_slug_pk" PRIMARY KEY("type","slug")
);
--> statement-breakpoint
CREATE TABLE "valentine" (
	"id" varchar(6) PRIMARY KEY NOT NULL,
	"config" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);
