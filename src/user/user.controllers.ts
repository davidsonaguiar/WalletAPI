import { Request, Response } from "express";

import { UserServices } from "./user.services";
import { AuthenticationError } from "./user.errors";
import { Config } from "../config/development";

export class UserControllers {
  constructor(private readonly services: UserServices) {}

  async handleCreateUser(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
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
    try {
      const { email, password } = request.body;
      const { token, user } = await this.services.AuthenticationUser({ email, password });
      response.cookie("token", token, {
        httpOnly: true,
        secure: Config.env === "production",
        sameSite: "strict",
        maxAge: Config.COOKIE_MAX_AGE,
      })
      response.status(200).json({
        message: "Usuário logado com sucesso.",
        user
      });
    } catch (error) {
      if (error instanceof AuthenticationError ) {
        return response.status(401).json(error.message);
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
