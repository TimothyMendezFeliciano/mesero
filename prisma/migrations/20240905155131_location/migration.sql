/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `longitud` on the `Location` table. All the data in the column will be lost.
  - Added the required column `title` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Location_coordinates_idx";

-- DropIndex
DROP INDEX "Location_latitude_longitud_idx";

-- DropIndex
DROP INDEX "Location_latitude_longitud_restaurandId_idx";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "coordinates",
DROP COLUMN "latitude",
DROP COLUMN "longitud",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE INDEX "Location_address_idx" ON "Location"("address");

-- CreateIndex
CREATE INDEX "Location_website_idx" ON "Location"("website");

-- CreateIndex
CREATE INDEX "Location_phone_idx" ON "Location"("phone");

-- CreateIndex
CREATE INDEX "Location_phone_title_idx" ON "Location"("phone", "title");

-- CreateIndex
CREATE INDEX "Location_website_title_idx" ON "Location"("website", "title");
