import { Account } from "@prisma/client";
import prisma from "../../prisma";

const accountRepository = prisma.account;

async function updateAccount(data: Account) {
  return await accountRepository.update({
    where: { id: data.id },
    data: { name: data.name }
  })
}

export default updateAccount;