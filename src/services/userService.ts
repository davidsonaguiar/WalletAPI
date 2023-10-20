import jwt from "jsonwebtoken";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import { ZodError, z } from "zod";
import { User } from "@prisma/client";

const userRepository = prisma.user;

const voidOrNull = (field: string) =>
  `${field}: vazio ou nulo: Dado obrigatório.`;
const type = (field: string) => `Tipo Inválido, ${field} é do tipo string.`;
const minCharacter = (field: string, min?: number) =>
  `${field} deve ter no mínimo ${min} caracteres.`;
const maxCharacter = (field: string, max?: number) =>
  `${field} deve ter no máximo ${max} caracteres.`;

const saveUserSchema = z.object({
  name: z
    .string({
      required_error: voidOrNull("Nome"),
      invalid_type_error: type("Nome"),
    })
    .min(3, { message: minCharacter("Nome", 3) })
    .max(100, { message: maxCharacter("Nome", 100) }),
  login: z
    .string({
      required_error: voidOrNull("Login"),
      invalid_type_error: type("Login"),
    })
    .min(3, { message: minCharacter("Login", 3) })
    .max(30, { message: maxCharacter("Login", 30) }),
  password: z
    .string({
      required_error: voidOrNull("Password"),
      invalid_type_error: type("Password"),
    })
    .min(3, { message: minCharacter("Password", 3) })
    .max(30, { message: maxCharacter("Password", 20) }),
});

async function saveUser(data: User) {
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
    if(user) {
      return user;
    }
  } catch(error) {
    if (error instanceof ZodError) {
      throw new Error(error.issues.map((issue) => issue.message).join(", "));
    } else {
      throw error;
    }
  }

}

function getUserIdByToken(auth: string) {
  const token = auth && auth.split(" ")[1];
  if (process.env.SECRET) {
    const user = jwt.verify(token, process.env.SECRET);
    console.log(user);
    if (typeof user === "object" && "id" in user) {
      return user;
    }
    return null;
  }
  return null;
}

const userService = {
  saveUser,
  findUserByLogin,
  getUserIdByToken,
};

export default userService;
