import prisma from "../../prisma";

const transactionRepository = prisma.transaction;

async function findTransactionByAccountId(id_account: string) {
  return await transactionRepository.findMany({
    where: { id_account }
  });
}

export default findTransactionByAccountId;