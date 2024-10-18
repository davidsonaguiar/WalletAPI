import { CategoryWithoutUserId, SaveCategoryInput } from "../category-models";

export interface CategoryRepositoryProtocol {
    save(input: SaveCategoryInput): Promise<CategoryWithoutUserId>;
    findAllByUserId(userId: string): Promise<CategoryWithoutUserId[]>;
}
