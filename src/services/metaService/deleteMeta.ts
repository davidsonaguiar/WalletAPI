import prisma from "../../prisma"

const metaRepository = prisma.meta;

async function deleteMeta(id: string) {
  return await metaRepository.delete({ 
    where: { id }
   })
}

export default deleteMeta;