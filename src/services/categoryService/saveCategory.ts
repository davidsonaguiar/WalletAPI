import { Category } from "@prisma/client";
import prisma from "../../prisma"

const categoryRepository = prisma.category;


async function saveCategory(data: Category) {
  return categoryRepository.create({ data })
}

export default saveCategory;