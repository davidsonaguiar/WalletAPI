import { ZodError } from "zod";
import prisma from "../../prisma";
import saveUserSchema, { saveUserSchemaType } from "../../schemas/saveUserSchema";
import bcrypt from "bcrypt";

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

export default saveUser;