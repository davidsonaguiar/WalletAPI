import { Transaction } from "@prisma/client";
import prisma from "../../prisma";

const transactionRepository = prisma.transaction;


async function saveTransaction(data: Transaction) {
  return await transactionRepository.create({ data });
}

export default saveTransaction;