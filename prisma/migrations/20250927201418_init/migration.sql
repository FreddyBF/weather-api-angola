/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Location";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "tb_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_Location_name_key" ON "tb_Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Location_slug_key" ON "tb_Location"("slug");
