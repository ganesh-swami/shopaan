-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'DONE');

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "Entry_userId_idx" ON "Entry"("userId");

-- CreateIndex
CREATE INDEX "Entry_status_idx" ON "Entry"("status");

-- CreateIndex
CREATE INDEX "Item_name_idx" ON "Item"("name");
