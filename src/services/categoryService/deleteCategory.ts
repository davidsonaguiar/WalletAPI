import prisma from "../../prisma"

const categoryRepository = prisma.category;

async function deleteCategory(id: number) {
  return categoryRepository.delete({
    where: { id }
  })
}

export default deleteCategory;