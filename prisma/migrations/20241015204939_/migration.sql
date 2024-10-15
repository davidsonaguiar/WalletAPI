/*
  Warnings:

  - The primary key for the `Meta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `meta_category_id` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `meta_id` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `meta_month` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `meta_user_email` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `meta_value` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `meta_year` on the `Meta` table. All the data in the column will be lost.
  - The primary key for the `tbl_transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `transaction_date` on the `tbl_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_description` on the `tbl_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `tbl_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id_account` on the `tbl_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id_category` on the `tbl_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_value` on the `tbl_transactions` table. All the data in the column will be lost.
  - You are about to drop the `tbl_accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[month,year,userId,categoryId]` on the table `Meta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Meta` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `month` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `tbl_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `tbl_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `tbl_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `tbl_transactions` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `tbl_transactions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `value` to the `tbl_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meta" DROP CONSTRAINT "Meta_meta_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Meta" DROP CONSTRAINT "Meta_meta_user_email_fkey";

-- DropForeignKey
ALTER TABLE "tbl_accounts" DROP CONSTRAINT "tbl_accounts_account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_categories" DROP CONSTRAINT "tbl_categories_category_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_transactions" DROP CONSTRAINT "tbl_transactions_transaction_id_account_fkey";

-- DropForeignKey
ALTER TABLE "tbl_transactions" DROP CONSTRAINT "tbl_transactions_transaction_id_category_fkey";

-- DropIndex
DROP INDEX "Meta_meta_month_meta_year_meta_user_email_meta_category_id_key";

-- AlterTable
ALTER TABLE "Meta" DROP CONSTRAINT "Meta_pkey",
DROP COLUMN "meta_category_id",
DROP COLUMN "meta_id",
DROP COLUMN "meta_month",
DROP COLUMN "meta_user_email",
DROP COLUMN "meta_value",
DROP COLUMN "meta_year",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
ADD CONSTRAINT "Meta_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tbl_transactions" DROP CONSTRAINT "tbl_transactions_pkey",
DROP COLUMN "transaction_date",
DROP COLUMN "transaction_description",
DROP COLUMN "transaction_id",
DROP COLUMN "transaction_id_account",
DROP COLUMN "transaction_id_category",
DROP COLUMN "transaction_value",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "tbl_transactions_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "tbl_accounts";

-- DropTable
DROP TABLE "tbl_categories";

-- DropTable
DROP TABLE "tbl_users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_userId_key" ON "Account"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_type_userId_key" ON "Category"("name", "type", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Meta_month_year_userId_categoryId_key" ON "Meta"("month", "year", "userId", "categoryId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transactions" ADD CONSTRAINT "tbl_transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transactions" ADD CONSTRAINT "tbl_transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
