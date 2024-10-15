-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Ganhos', 'Gastos');

-- CreateTable
CREATE TABLE "tbl_users" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "user_login" VARCHAR(30) NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "tbl_accounts" (
    "account_id" TEXT NOT NULL,
    "account_name" VARCHAR(30) NOT NULL,
    "account_user_id" TEXT NOT NULL,

    CONSTRAINT "tbl_accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "tbl_transactions" (
    "transaction_id" TEXT NOT NULL,
    "transaction_value" DOUBLE PRECISION NOT NULL,
    "transaction_description" VARCHAR(100) NOT NULL,
    "transaction_date" DATE NOT NULL,
    "transaction_id_category" INTEGER NOT NULL,
    "transaction_id_account" TEXT NOT NULL,

    CONSTRAINT "tbl_transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "tbl_categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_type" "Type" NOT NULL,
    "category_user_id" TEXT,

    CONSTRAINT "tbl_categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Meta" (
    "meta_id" TEXT NOT NULL,
    "meta_value" DOUBLE PRECISION NOT NULL,
    "meta_month" INTEGER NOT NULL,
    "meta_year" INTEGER NOT NULL,
    "meta_user_email" TEXT NOT NULL,
    "meta_category_id" INTEGER NOT NULL,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("meta_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_user_login_key" ON "tbl_users"("user_login");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_accounts_account_name_account_user_id_key" ON "tbl_accounts"("account_name", "account_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_categories_category_name_category_type_category_user_id_key" ON "tbl_categories"("category_name", "category_type", "category_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Meta_meta_month_meta_year_meta_user_email_meta_category_id_key" ON "Meta"("meta_month", "meta_year", "meta_user_email", "meta_category_id");

-- AddForeignKey
ALTER TABLE "tbl_accounts" ADD CONSTRAINT "tbl_accounts_account_user_id_fkey" FOREIGN KEY ("account_user_id") REFERENCES "tbl_users"("user_login") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transactions" ADD CONSTRAINT "tbl_transactions_transaction_id_account_fkey" FOREIGN KEY ("transaction_id_account") REFERENCES "tbl_accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transactions" ADD CONSTRAINT "tbl_transactions_transaction_id_category_fkey" FOREIGN KEY ("transaction_id_category") REFERENCES "tbl_categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_categories" ADD CONSTRAINT "tbl_categories_category_user_id_fkey" FOREIGN KEY ("category_user_id") REFERENCES "tbl_users"("user_login") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_meta_user_email_fkey" FOREIGN KEY ("meta_user_email") REFERENCES "tbl_users"("user_login") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_meta_category_id_fkey" FOREIGN KEY ("meta_category_id") REFERENCES "tbl_categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
