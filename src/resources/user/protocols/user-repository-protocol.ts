import { SaveUserInput, SaveUserOutput, User } from "../user-models";

export interface UserRepositoryProtocol {
  findByEmail(email: string): Promise<User | null>;
  emailExists(email: string): Promise<boolean>;
  save(user: SaveUserInput): Promise<SaveUserOutput>;
}