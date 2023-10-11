import { Category } from "@prisma/client";
import prisma from "../prisma"

const categoryRepository = prisma.category;

async function findCategoryById(id: number) {
  return categoryRepository.findUniqueOrThrow({
    where: { id }
  })
}

async function findCategoryByUnique(name: string, type: "Ganhos" | "Gastos", user_id: string) {
  return categoryRepository.findUniqueOrThrow({
    where: {
      name_type_user_id: {
        name,
        user_id,
        type
      }
    }
  })
}

async function findCategories(userId: string) {
  return categoryRepository.findMany({
    where: {
      OR: [
        { user_id: userId },
        { user_id: null }
      ]
    }
  });
}

async function saveCategory(data: Category) {
  return categoryRepository.create({ data })
}

async function updateCategory(data: Category) {
  return categoryRepository.update({
    where: { id: data.id },
    data
  })
}

async function deleteCategory(id: number) {
  return categoryRepository.delete({
    where: { id }
  })
}

const categoryService = {
  findCategoryById,
  findCategoryByUnique,
  findCategories, 
  saveCategory,
  updateCategory,
  deleteCategory
}

export default categoryService;