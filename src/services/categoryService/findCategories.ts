import prisma from "../../prisma"

const categoryRepository = prisma.category;

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

export default findCategories;