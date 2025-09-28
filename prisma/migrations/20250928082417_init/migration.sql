-- CreateTable
CREATE TABLE "public"."tb_Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tb_Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_Location_name_key" ON "public"."tb_Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_Location_slug_key" ON "public"."tb_Location"("slug");
