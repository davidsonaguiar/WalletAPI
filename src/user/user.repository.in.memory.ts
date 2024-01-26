import { UserEntity } from "./user.models";
import { UserRepositoryProtocol } from "./user.repository.protocol";

export class UserRepositoryInMemory implements UserRepositoryProtocol {

  private users: UserEntity[] = [];
  
  async save(user: UserEntity): Promise<void> {
    this.users.push(user);
  }
  
  async getByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find((user) => user.email === email) || null;
  }
  
}

