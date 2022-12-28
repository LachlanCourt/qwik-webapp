-- CreateTable
CREATE TABLE "Token" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiry" DATETIME NOT NULL,
    "accountId" INTEGER,

    PRIMARY KEY ("email", "type")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");
