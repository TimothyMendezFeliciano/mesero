/*
  Warnings:

  - A unique constraint covering the columns `[town]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_town_key" ON "Location"("town");
