import prisma from "../../prisma";

const transactionRepository = prisma.transaction;

async function deleteTransaction(id: string, userId: string) {
  return await transactionRepository.delete({
    where: {
      id: id,
      account: { user_id: userId}
    }
  })
}

export default deleteTransaction;