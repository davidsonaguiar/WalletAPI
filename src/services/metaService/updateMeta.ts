import { Meta } from "@prisma/client";
import prisma from "../../prisma"

const metaRepository = prisma.meta;


async function updateMeta(data: Meta) {
  return await metaRepository.update({
    where: { id: data.id, user_id: data.user_id },
    data: {
      month: Number(data.month),
      value: Number(data.value),
      year: Number(data.year),
      category_id: data.category_id
    }
  })
}

export default updateMeta;