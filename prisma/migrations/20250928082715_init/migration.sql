/*
  Warnings:

  - You are about to drop the `tb_Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."tb_Location";

-- CreateTable
CREATE TABLE "public"."tb_location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_location_name_key" ON "public"."tb_location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_location_slug_key" ON "public"."tb_location"("slug");
