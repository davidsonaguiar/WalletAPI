import { sign } from "jsonwebtoken";
import { hash, genSalt, compare } from "bcrypt";
import { config } from "dotenv";

import { AuthenticationInput, UserEntity } from "./user.models";
import { UserRepositoryProtocol } from "./user.repository.protocol";

config();

export class UserServices {
  constructor(public repository: UserRepositoryProtocol) {}

  async CreateUser(input: UserEntity) {
    try {
      const emailExists = await this.repository.getByEmail(input.email);
      if (emailExists) throw new Error("Email já cadastrado");
      const salt = await genSalt(12);
      input.password = await hash(input.password, salt);
      await this.repository.save(input);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Erro no servidor");
    }
  }

  async AuthenticationUser(input: AuthenticationInput) {
    try {
      const user = await this.repository.getByEmail(input.email);
      if (!user) throw new Error("Usuario não encontrado");
      const isEqual = await compare(input.password, user.password);
      if (!isEqual) throw new Error("Senha incorreta");
      const token = sign(user, process.env.SECRET!);
      return { 
        user: { 
          name: user.name, 
          email: user.email 
        },
        token, 
      };
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Erro no servidor");
    }
  }
}
