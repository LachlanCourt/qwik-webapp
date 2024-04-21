-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "commandId" INTEGER NOT NULL,
    "order" INTEGER NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Copy data from command into action
INSERT INTO "Action" ("commandId", "type", "content") 
SELECT id, 'RESPONSE', response FROM "Command";

-- AlterTable
ALTER TABLE "Command" DROP COLUMN "response";
