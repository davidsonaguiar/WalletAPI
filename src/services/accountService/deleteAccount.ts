import prisma from "../../prisma";

const accountRepository = prisma.account;

async function deleteAccount(id: string) {
  return await accountRepository.delete({ 
    where: { id, transactions: {
      every: {
        id_account: id
      }
    } },
  })
}

export default deleteAccount;