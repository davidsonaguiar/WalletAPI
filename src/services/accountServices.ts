import { Account, PrismaClient } from "@prisma/client";

const accountRepository = new PrismaClient().account;

async function findAccountById(id: string) {
  return await accountRepository.findUniqueOrThrow({
    where: { id }
  });
}

async function findAccountsByUserId(user_id: string) {
  return await accountRepository.findMany({
    where: { user_id }
  });
}

async function findAccountByName(name: string, user_id: string) {
  return await accountRepository.findUniqueOrThrow({
    where: { name_user_id: { name, user_id } },
  });
}

async function saveAccount(data: Account) {
  return await accountRepository.create({ data });
}

async function updateAccount(data: Account) {
  return await accountRepository.update({
    where: { id: data.id },
    data: { name: data.name }
  })
}

async function deleteAccount(id: string) {
  return await accountRepository.delete({ 
    where: { id}
  })
}

const accountServices = {
  findAccountByName,
  findAccountsByUserId,
  findAccountById,
  saveAccount,
  updateAccount,
  deleteAccount
};

export default accountServices;
