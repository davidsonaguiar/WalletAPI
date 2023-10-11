/*
  Warnings:

  - A unique constraint covering the columns `[category_name,category_type,category_user_id]` on the table `tbl_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tbl_categories_category_name_category_type_key";

-- AlterTable
ALTER TABLE "tbl_categories" ADD COLUMN     "category_user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_categories_category_name_category_type_category_user_id_key" ON "tbl_categories"("category_name", "category_type", "category_user_id");

-- AddForeignKey
ALTER TABLE "tbl_categories" ADD CONSTRAINT "tbl_categories_category_user_id_fkey" FOREIGN KEY ("category_user_id") REFERENCES "tbl_users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
