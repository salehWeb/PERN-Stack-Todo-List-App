CREATE TABLE IF NOT EXISTS "user" (
  "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
  "name" VARCHAR(100) NOT NULL,
  "password" TEXT NOT NULL
);