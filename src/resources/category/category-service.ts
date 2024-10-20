import { ErrorStandard } from "../../error/error-standard";
import { UserRepositoryProtocol } from "../user/protocols/user-repository-protocol";
import { SaveCategoryInput, CategoryWithoutUserId, Category } from "./category-models";
import { CategoryRepositoryProtocol } from "./protocols/category-repository-protocol";

export class CategoryService {
    constructor(
        private readonly categoryRepository: CategoryRepositoryProtocol,
        private readonly userRepository: UserRepositoryProtocol
    ) {}

    async save(input: SaveCategoryInput): Promise<CategoryWithoutUserId> {
        const user = await this.userRepository.findById(input.userId);
        if (!user) throw new ErrorStandard("No authorization!", 401);
        const categoryExists = user.categories.find((category) => {
            return category.name === input.name && category.type === input.type;
        });
        if (categoryExists) throw new ErrorStandard("Category already exists", 409);
        return await this.categoryRepository.save(input);
    }

    async findAll(userId: string): Promise<CategoryWithoutUserId[]> {
        return await this.categoryRepository.findAllByUserId(userId);
    }

    async update(category: Category): Promise<CategoryWithoutUserId> {
        const user = await this.userRepository.findById(category.userId);
        if (!user) throw new ErrorStandard("No authorization!", 401);
        const categoryExists = user.categories.find((c) => c.id === category.id);
        if (!categoryExists) throw new ErrorStandard("Category not found", 404);
        return await this.categoryRepository.update(category);
    }
}
