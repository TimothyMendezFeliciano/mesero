-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");
