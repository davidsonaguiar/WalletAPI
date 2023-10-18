import userService from "../services/userService";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

async function register(request: Request, response: Response) {
  const newUser: User = await request.body;
  try {
    await userService.findUserByLogin(newUser.login);
    return response.status(400).send("Login já cadastrado");
  } catch (error) {
    try {
      const salt = await bcrypt.genSalt(12);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      const user = await userService.saveUser(newUser);
      if(process.env.SECRET) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET);
        return response.status(201).json(token);
      } 
    } catch (error) {
      return response.status(400).send("Dados inválidos.");
    }
  }
}

async function login(request: Request, response: Response) {
  const { login, password } = await request.body;

  try {
    const user = await userService.findUserByLogin(login);
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET!);
        return response.status(200).json(token);
    } else {
      return response.status(400).json("Senha incorreta.");
    }
  } catch (error) {
    return response.status(404).json("Login não localizado.");
  }
}

async function validateToken(request: Request, response: Response) {
  const token = request.headers.authorization;
  const auth = token && userService.getUserIdByToken(token);
 
  return auth
    ? response.status(200).json(auth)
    : response.status(401).json("Token Inválido.");
}

const userController = {
  register,
  login,
  validateToken
};

export default userController;
