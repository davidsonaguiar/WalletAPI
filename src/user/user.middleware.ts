import { NextFunction, Request, Response } from "express";
import { UserEntity } from "./user.models";

export class UserMiddleware {
  validateCreateInput(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const errors = [];
    const { name, email, password } = request.body;
    if (!name) errors.push("Nome é obrigatório.");
    if (name && name.length < 3)
      errors.push("Nome deve ter no mínimo 3 caracteres.");
    if (name && name.length > 50)
      errors.push("Nome deve ter no máximo 50 caracteres.");
    if (name && !name.match(/^[a-zA-Z\s]*$/))
      errors.push("Nome deve conter apenas letras.");
    if (!email) errors.push("Email é obrigatório.");
    if (email && !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i))
      errors.push("Email inválido.");
    if (!password) errors.push("Senha é obrigatório.");
    if (password && password.length < 6)
      errors.push("Senha deve ter no mínimo 6 caracteres.");
    if (password && password.length > 30)
      errors.push("Senha deve ter no máximo 30 caracteres.");
    if (password && !password.match(/^[a-z0-9]+$/i))
      errors.push("Senha deve conter apenas letras e números.");
    if (errors.length !== 0)
      return response
        .status(400)
        .json({ error: "Erro ao criar usuário: \n " + errors.join("\n") });
    next();
  }

  validateAuthenticateInput(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const errors = [];
    const { email, password } = request.body;
    if (!email) errors.push("Email é obrigatório.");
    if (!password) errors.push("Senha é obrigatório.");
    if (errors.length !== 0)
      return response
        .status(400)
        .json({ error: "Erro ao autenticar usuário: \n " + errors.join("\n") });
    next();
  }
}
