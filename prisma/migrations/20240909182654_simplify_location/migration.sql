/*
  Warnings:

  - You are about to drop the column `address` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `restaurandId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Location` table. All the data in the column will be lost.
  - Added the required column `town` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_restaurandId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_restaurantMenuId_fkey";

-- DropIndex
DROP INDEX "Location_address_idx";

-- DropIndex
DROP INDEX "Location_phone_idx";

-- DropIndex
DROP INDEX "Location_phone_title_idx";

-- DropIndex
DROP INDEX "Location_restaurandId_key";

-- DropIndex
DROP INDEX "Location_website_idx";

-- DropIndex
DROP INDEX "Location_website_title_idx";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "address",
DROP COLUMN "phone",
DROP COLUMN "restaurandId",
DROP COLUMN "title",
DROP COLUMN "website",
ADD COLUMN     "town" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "locationId" TEXT,
ALTER COLUMN "restaurantMenuId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Location_town_idx" ON "Location"("town");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_restaurantMenuId_fkey" FOREIGN KEY ("restaurantMenuId") REFERENCES "RestaurantMenu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
