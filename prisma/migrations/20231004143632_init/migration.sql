-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Ganhos', 'Gastos');

-- CreateTable
CREATE TABLE "tbl_users" (
    "user_id" TEXT NOT NULL,
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
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "transaction_id_category" INTEGER NOT NULL,
    "transaction_id_account" TEXT NOT NULL,

    CONSTRAINT "tbl_transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "tbl_categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_type" "Type" NOT NULL,

    CONSTRAINT "tbl_categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_user_login_key" ON "tbl_users"("user_login");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_accounts_account_name_account_user_id_key" ON "tbl_accounts"("account_name", "account_user_id");

-- AddForeignKey
ALTER TABLE "tbl_accounts" ADD CONSTRAINT "tbl_accounts_account_user_id_fkey" FOREIGN KEY ("account_user_id") REFERENCES "tbl_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transactions" ADD CONSTRAINT "tbl_transactions_transaction_id_account_fkey" FOREIGN KEY ("transaction_id_account") REFERENCES "tbl_accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transactions" ADD CONSTRAINT "tbl_transactions_transaction_id_category_fkey" FOREIGN KEY ("transaction_id_category") REFERENCES "tbl_categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
