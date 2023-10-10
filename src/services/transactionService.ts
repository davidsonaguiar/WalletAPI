import { Transaction } from "@prisma/client";
import prisma from "../prisma";

const transactionRepository = prisma.transaction;

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

async function updateTransaction(data: Transaction, userId: string) {
  return await transactionRepository.update({
    where: { 
      id: data.id, 
      account: { user_id: userId} 
    },
    data: data
  });
}

async function deleteTransaction(id: string, userId: string) {
  return await transactionRepository.delete({
    where: {
      id: id,
      account: { user_id: userId}
    }
  })
}

async function deleteTransactionsByAccountId(id: string) {
  return await transactionRepository.deleteMany({
    where: {
      id_account: id
    }
  });
}

const transactionService = {
  findTransactionById,
  findTransactionByUserId,
  findTransactionByAccountId,
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  deleteTransactionsByAccountId
}

export default transactionService;