import prisma from "../../prisma";

const transactionRepository = prisma.transaction;


async function deleteTransactionsByAccountId(id: string) {
  return await transactionRepository.deleteMany({
    where: {
      id_account: id
    }
  });
}

export default deleteTransactionsByAccountId;