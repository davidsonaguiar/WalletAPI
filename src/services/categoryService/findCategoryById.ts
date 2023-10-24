import prisma from "../../prisma"

const categoryRepository = prisma.category;

async function findCategoryById(id: number) {
  return categoryRepository.findUniqueOrThrow({
    where: { id }
  })
}

export default findCategoryById;