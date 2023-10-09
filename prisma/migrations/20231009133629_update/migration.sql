/*
  Warnings:

  - A unique constraint covering the columns `[category_name,category_type]` on the table `tbl_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tbl_transactions" ALTER COLUMN "transaction_date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_categories_category_name_category_type_key" ON "tbl_categories"("category_name", "category_type");
