import { Category } from "@prisma/client";
import prisma from "../../prisma"

const categoryRepository = prisma.category;

async function updateCategory(data: Category) {
  return categoryRepository.update({
    where: { id: data.id },
    data
  })
}

export default updateCategory;