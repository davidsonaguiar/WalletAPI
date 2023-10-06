import prisma from "../prisma"

const categoryRepository = prisma.category;

async function findCategories() {
  return categoryRepository.findMany();
}

const categoryService = {
  findCategories
}

export default categoryService;