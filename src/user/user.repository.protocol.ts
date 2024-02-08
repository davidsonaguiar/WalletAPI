import { UserEntity } from "./user.models";

export interface UserRepositoryProtocol {
  getByEmail(email: string): Promise<UserEntity | null>;
  emailExists(email: string): Promise<boolean>;
  save(user: UserEntity): Promise<void>;
}