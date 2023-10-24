import userService from "../services/userService/";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserIdByToken, tokenGenerator } from "../utils";
import { Request, Response } from "express";
import { User } from "@prisma/client";


async function register(request: Request, response: Response) {
  const newUser: User = await request.body;
  const userAlreadyExist = await userService.findUserByLogin(newUser.login);
  if(userAlreadyExist) return response.status(400).json("Login já cadastrado")

  try {
    const user = await userService.saveUser(newUser);
    response.status(201).json({
      message: "sucess",
      token: tokenGenerator(user),
      user: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json(error.message);
    }
    return response.status(500).json("Erro no servidor.");
  }
}

async function login(request: Request, response: Response) {
  const { login, password } = await request.body;

  try {
    const user = await userService.findUserByLogin(login);
    if(user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET!);
        return response.status(200).json(token);
      } else {
        return response.status(400).json("Senha incorreta.");
      }
    } else {
      return response.status(404).json("Usuário não localizado.");
    }
  } catch (error) {
    if(error instanceof Error) {
      return response.status(400).json(error.message);
    }
    return response.status(500).json("Error Servidor");
  }
}

async function validateToken(request: Request, response: Response) {
  const token = request.headers.authorization;
  const auth = token && getUserIdByToken(token);

  return auth
    ? response.status(200).json(auth)
    : response.status(401).json("Token Inválido.");
}

const userController = {
  register,
  login,
  validateToken,
};

export default userController;
