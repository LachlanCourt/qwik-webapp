ALTER TABLE "Command" ADD COLUMN "response" TEXT NULL;

ALTER TABLE "Action" DROP CONSTRAINT "Action_commandId_fkey";

DROP TABLE "Action"
