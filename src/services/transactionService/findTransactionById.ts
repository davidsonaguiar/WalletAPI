import prisma from "../../prisma";

const transactionRepository = prisma.transaction;

async function findTransactionById(id: string) {
  return await transactionRepository.findUniqueOrThrow({
    where: { id}
  });
}

export default findTransactionById;