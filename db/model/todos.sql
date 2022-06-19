CREATE TABLE IF NOT EXISTS "todo" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);
