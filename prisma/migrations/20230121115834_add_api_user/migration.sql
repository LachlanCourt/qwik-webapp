-- CreateTable
CREATE TABLE "ApiUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiUser_username_key" ON "ApiUser"("username");
