-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApiUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL,
    "webhookUrl" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_ApiUser" ("discriminator", "id", "password", "username") SELECT "discriminator", "id", "password", "username" FROM "ApiUser";
DROP TABLE "ApiUser";
ALTER TABLE "new_ApiUser" RENAME TO "ApiUser";
CREATE UNIQUE INDEX "ApiUser_username_key" ON "ApiUser"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
