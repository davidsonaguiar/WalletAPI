import userServices from "../services/userServices";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

async function register(request: Request, response: Response) {
  const newUser: User = await request.body;

  try {
    await userServices.findUserByLogin(newUser.login);
    return response.status(400).send("Login já cadastrado");
  } catch (error) {
    try {
      const salt = await bcrypt.genSalt(12);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await userServices.saveUser(newUser);
      return response.status(201).json("Registrado com sucesso.");
    } catch (error) {
      return response.status(400).send("Dados inválidos.");
    }
  }
}

async function login(request: Request, response: Response) {
  const { login, password } = await request.body;

  try {
    const user = await userServices.findUserByLogin(login);
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      const token = jwt.sign({ id: user.id }, "secret");
      return response.status(200).json(token);
    } else {
      return response.status(400).send("Senha incorreta.");
    }
  } catch (error) {
    return response.status(404).send("Login não localizado.");
  }
}

const userControllers = {
  register,
  login,
};

export default userControllers;
