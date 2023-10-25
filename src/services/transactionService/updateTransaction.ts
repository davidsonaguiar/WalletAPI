import { Transaction } from "@prisma/client";
import prisma from "../../prisma";

const transactionRepository = prisma.transaction;

async function updateTransaction(data: Transaction, userId: string) {
  return await transactionRepository.update({
    where: { 
      id: data.id, 
      account: { user_id: userId} 
    },
    data: data
  });
}

export default updateTransaction;