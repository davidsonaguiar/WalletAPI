import { CategoryType } from "./enums/category-type";

export type Category = {
    id: number;
    name: string;
    userId: string;
    type: CategoryType
}

export type SaveCategoryInput = Omit<Category, "id">;
export type CategoryWithoutUserId = Omit<Category, "userId">;