import { UserEntity } from "./user.models";

export interface UserRepositoryProtocol {
  getByEmail(email: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<void>;
}