import prisma from "../../prisma";

const accountRepository = prisma.account;

async function findAccountById(id: string) {
  return await accountRepository.findUniqueOrThrow({
    where: { id }
  });
}

export default findAccountById;