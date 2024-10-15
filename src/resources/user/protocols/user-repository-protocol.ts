import { SaveUserInput, SaveUserOutput, User } from "../user-models";

export interface UserRepositoryProtocol {
  save(user: SaveUserInput): Promise<SaveUserOutput>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  emailExists(email: string): Promise<boolean>;
}