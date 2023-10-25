import prisma from "../../prisma";

const accountRepository = prisma.account;

async function findAccountsByUserId(user_id: string) {
  return await accountRepository.findMany({
    where: { user_id }
  });
}

export default findAccountsByUserId;