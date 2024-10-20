import { Category, CategoryWithoutUserId, SaveCategoryInput } from "../category-models";

export interface CategoryRepositoryProtocol {
    save(input: SaveCategoryInput): Promise<CategoryWithoutUserId>;
    findAllByUserId(userId: string): Promise<CategoryWithoutUserId[]>;
    update(category: Category): Promise<CategoryWithoutUserId>;
}
