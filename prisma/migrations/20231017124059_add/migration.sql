-- CreateTable
CREATE TABLE "Meta" (
    "meta_id" TEXT NOT NULL,
    "meta_value" DOUBLE PRECISION NOT NULL,
    "meta_month" INTEGER NOT NULL,
    "meta_year" INTEGER NOT NULL,
    "meta_user_id" TEXT NOT NULL,
    "meta_category_id" INTEGER NOT NULL,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("meta_id")
);

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_meta_user_id_fkey" FOREIGN KEY ("meta_user_id") REFERENCES "tbl_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_meta_category_id_fkey" FOREIGN KEY ("meta_category_id") REFERENCES "tbl_categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
