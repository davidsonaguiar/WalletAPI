import { Meta } from "@prisma/client";
import prisma from "../prisma"

const metaRepository = prisma.meta;

async function findMetasByUserId(id: string) {
  return await metaRepository.findMany({
    where: { user_id: id }
  });
}

async function saveMeta(data: Meta) {
  return await metaRepository.create({ data })
}

async function updateMeta(data: Meta) {
  return await metaRepository.update({
    where: { id: data.id, user_id: data.user_id },
    data: {
      month: data.month,
      value: data.value,
      year: data.year,
      category_id: data.category_id
    }
  })
}

async function deleteMeta(id: string) {
  return await metaRepository.delete({ 
    where: { id }
   })
}


const metaService = {
  findMetasByUserId,
  saveMeta,
  updateMeta,
  deleteMeta
}

export default metaService;