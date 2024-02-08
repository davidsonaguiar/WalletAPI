import { AuthenticationError } from './user.errors';
import { sign } from "jsonwebtoken";
import { hash, genSalt, compare } from "bcrypt";
import { config } from "dotenv";

import { AuthenticationRequest, UserEntity } from "./user.models";
import { UserRepositoryProtocol } from "./user.repository.protocol";

config();

export class UserServices {
  constructor(public repository: UserRepositoryProtocol) {}

  async CreateUser(input: UserEntity) {
    try {
      const emailExists = await this.repository.emailExists(input.email);
      if (emailExists) throw AuthenticationError.emailExists();
      const salt = await genSalt(12);
      input.password = await hash(input.password, salt);
      await this.repository.save(input);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Erro no servidor");
    }
  }

  async AuthenticationUser(input: AuthenticationRequest) {
    const user = await this.repository.getByEmail(input.email);
    if (!user) throw AuthenticationError.userNotFound();
    const isEqual = await compare(input.password, user.password);
    if (!isEqual) throw AuthenticationError.passwordIncorrect();
    const token = sign(user, process.env.SECRET!);
    return { 
      user: { 
        name: user.name, 
        email: user.email,
        accounts: user.accounts,
      },
      token, 
    };
  }
}
