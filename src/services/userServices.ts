import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";

const userRepository = new PrismaClient().user;

async function saveUser(data: User) {
    return await userRepository.create({ data })
}

async function findUserByLogin(login: string) {
    return await userRepository.findUniqueOrThrow({
        where: { login }
    })
}

function getUserIdByToken(auth: string) {
  const token = auth && auth.split(' ')[1];
  const verify = jwt.verify(token, "secret");
  return typeof verify === "object" && "id" in verify
    ? verify.id
    : null;
}

const userServices = {
    saveUser,
    findUserByLogin,
    getUserIdByToken
}


export default userServices;