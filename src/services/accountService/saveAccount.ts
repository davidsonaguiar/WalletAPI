import { Account } from "@prisma/client";
import prisma from "../../prisma";

const accountRepository = prisma.account;

async function saveAccount(data: Account) {
  return await accountRepository.create({ data });
}

export default saveAccount;