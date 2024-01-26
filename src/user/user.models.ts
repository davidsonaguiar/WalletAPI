export interface UserEntity {
  name: string;
  email: string;
  password: string;
}
export type UserOutput = Omit<UserEntity, "password">;
export type AuthenticationInput = Omit<UserEntity, "name">;
export interface AuthenticationOutput {
  token: string;
  user: UserOutput;
}