import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserServices } from "./user.services";

export class UserControllers {
  constructor(private readonly services: UserServices) {}

  async handleCreateUser(request: Request, response: Response) {
    const { name, email, password } = await request.body;
    try {
      await this.services.CreateUser({ name, email, password });
      response.status(201).json({ message: "Usuário criado com sucesso." });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json(error.message);
      }
      return response.status(500).json("Error Servidor");
    }
  }

  async handleAuthentication(request: Request, response: Response) {
    const { email, password } = await request.body;
    try {
      const user = await this.services.AuthenticationUser({ email, password });
      response.status(200).json(user);
    } catch (error) {
      if(error instanceof Error) {
        return response.status(400).json(error.message);
      }
      return response.status(500).json("Error Servidor");
    }
  }
}


// async function validateToken(request: Request, response: Response) {
//   const token = request.headers.authorization;
//   const auth = token && getUserIdByToken(token);

//   return auth
//     ? response.status(200).json(auth)
//     : response.status(401).json("Token Inválido.");
// }

// const userController = {
//   register,
//   login,
//   validateToken,
// };

// export default userController;
