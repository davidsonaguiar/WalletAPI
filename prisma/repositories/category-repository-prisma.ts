import { PrismaClient, Category as CategoryPrisma } from "@prisma/client";
import { CategoryRepositoryProtocol } from "../../src/resources/category/protocols/category-repository-protocol";
import { SaveCategoryInput, CategoryWithoutUserId, Category } from "../../src/resources/category/category-models";
import { CategoryType } from "../../src/resources/category/enums/category-type";

export class CategoryRepositoryPrisma implements CategoryRepositoryProtocol{
    constructor(
        private readonly prisma: PrismaClient
    ){}

    async save(input: SaveCategoryInput): Promise<any> {
        return this.prisma.category.create({
            data: {
                name: input.name,
                type: CategoryType[input.type],
                userId: input.userId
            }, 
            select: {
                id: true,
                name: true,
                type: true,
            }
        })
    }

    async findAllByUserId(userId: string): Promise<any[]> {
        return this.prisma.category.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                type: true
            }
        })
    }

    async update(category: Category): Promise<any> {
        return this.prisma.category.update({
            where: { id: category.id },
            data: {
                name: category.name,
                type: CategoryType[category.type]
            }
        })
    }
}