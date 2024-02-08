import { UserEntity } from "./user.models";
import { UserRepositoryProtocol } from "./user.repository.protocol";

class UserRepositoryInMemory implements UserRepositoryProtocol {

  private users: UserEntity[] = [];
  
  async save(user: UserEntity): Promise<void> {
    this.users.push(user);
  }

  async emailExists(email: string): Promise<boolean> {
    return this.users.some((user) => user.email === email);
  }
  
  async getByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find((user) => user.email === email) || null;
  }
  
}

export default new UserRepositoryInMemory();
