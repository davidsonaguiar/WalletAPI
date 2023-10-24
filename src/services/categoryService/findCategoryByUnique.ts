import prisma from "../../prisma"

const categoryRepository = prisma.category;

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

export default findCategoryByUnique;