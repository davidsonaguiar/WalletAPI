import prisma from "../../prisma";

const accountRepository = prisma.account;

async function findAccountByName(name: string, user_id: string) {
  return await accountRepository.findUniqueOrThrow({
    where: { name_user_id: { name, user_id } },
  });
}

export default findAccountByName;