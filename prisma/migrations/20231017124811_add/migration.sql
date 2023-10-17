/*
  Warnings:

  - A unique constraint covering the columns `[meta_month,meta_year,meta_user_id,meta_category_id]` on the table `Meta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Meta_meta_month_meta_year_meta_user_id_meta_category_id_key" ON "Meta"("meta_month", "meta_year", "meta_user_id", "meta_category_id");
