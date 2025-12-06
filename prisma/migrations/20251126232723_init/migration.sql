/*
  Warnings:

  - A unique constraint covering the columns `[productId,authorId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reviews_productId_authorId_key" ON "reviews"("productId", "authorId");
