/*
  Warnings:

  - You are about to drop the column `visitorId` on the `favorites` table. All the data in the column will be lost.
  - Made the column `userId` on table `favorites` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropIndex
DROP INDEX "public"."favorites_visitorId_key";

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "visitorId",
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
