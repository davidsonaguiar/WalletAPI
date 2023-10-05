import { Transaction, PrismaClient } from "@prisma/client";

const transactionRepository = new PrismaClient().transaction;

async function findTransactionById(id: string) {
  return await transactionRepository.findUniqueOrThrow({
    where: { id}
  });
}

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


async function findTransactionByAccountId(id_account: string) {
  return await transactionRepository.findMany({
    where: { id_account }
  });
}

async function saveTransaction(data: Transaction) {
  return await transactionRepository.create({ data });
}


const transactionServices = {
  findTransactionById,
  findTransactionByUserId,
  findTransactionByAccountId,
  saveTransaction,
}

export default transactionServices;