/*
  Warnings:

  - You are about to drop the column `productModelId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `product_models` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brandId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_productModelId_fkey";

-- DropIndex
DROP INDEX "public"."products_productModelId_idx";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productModelId",
ADD COLUMN     "brandId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."product_models";

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_brandId_idx" ON "products"("brandId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
