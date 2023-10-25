import prisma from "../../prisma"

const metaRepository = prisma.meta;

async function findMetasByUserId(id: string) {
  return await metaRepository.findMany({
    where: { user_id: id },
    include: {
      category: true
    }
  });
}

export default findMetasByUserId;