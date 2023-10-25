import prisma from "../../prisma";

const transactionRepository = prisma.transaction;

async function findTransactionByUserId(user_id: string) {
  return await transactionRepository.findMany({
    where: { 
      account: { user_id }
    },
    select: {
      account: true,
      value: true,
      category: true,
      date: true,
      description: true, 
      id: true
    }
  });
}

export default findTransactionByUserId;