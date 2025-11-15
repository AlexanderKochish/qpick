/*
  Warnings:

  - A unique constraint covering the columns `[userId,city,street,building,apartment,postalCode]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addresses_userId_city_street_building_apartment_postalCode_key" ON "addresses"("userId", "city", "street", "building", "apartment", "postalCode");
