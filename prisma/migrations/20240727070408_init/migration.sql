/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Customer";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cast" TEXT NOT NULL,
    "address" TEXT,
    "village" TEXT,
    "phone" INTEGER,
    "fatherName" TEXT,
    "neighbour" TEXT,
    "rating" TEXT,
    "extra" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_cast_idx" ON "User"("cast");

-- CreateIndex
CREATE INDEX "User_village_idx" ON "User"("village");

-- CreateIndex
CREATE INDEX "User_phone_idx" ON "User"("phone");
