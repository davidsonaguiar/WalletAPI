import prisma from "../../prisma";
import saveUserSchema from "../../schemas/saveUserSchema";
import { ZodError } from "zod";

const userRepository = prisma.user;


async function findUserByLogin(login: string) {

  try {
    const validateLogin = saveUserSchema.partial({ name: true, password: true }).parse({ login });
    const user = userRepository.findUnique({where: { login: validateLogin.login }});
    return user ?? null;
  } catch(error) {
    if (error instanceof ZodError) {
      throw new Error(error.issues.map((issue) => issue.message).join(", "));
    }
  }

}

export default findUserByLogin;