import jwt from "jsonwebtoken";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import saveUserSchema, { saveUserSchemaType } from "../schemas/saveUserSchema";
import { ZodError } from "zod";

const userRepository = prisma.user;

async function saveUser(data: saveUserSchemaType) {
  try {

    const validatedData = saveUserSchema.parse(data);

    const salt = await bcrypt.genSalt(12);
    validatedData.password = await bcrypt.hash(data.password, salt);

    const createdUser = await userRepository.create({ data: validatedData });

    return {
      id: createdUser.id,
      name: createdUser.name,
      login: createdUser.login,
    };

  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.issues.map((issue) => issue.message).join(", "));
    } else {
      throw error;
    }
  }
}

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

const userService = {
  saveUser,
  findUserByLogin,
};

export default userService;
