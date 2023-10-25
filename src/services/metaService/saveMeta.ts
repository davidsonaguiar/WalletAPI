import { Meta } from "@prisma/client";
import prisma from "../../prisma"

const metaRepository = prisma.meta;

async function saveMeta(data: Meta) {
  return await metaRepository.create({ data: {
    month: Number(data.month),
    value: Number(data.value),
    year: Number(data.year),
    category_id: data.category_id,
    user_id: data.user_id
  } })
}

export default saveMeta;