import { AccountEntity, AccountWithoutUserEmail } from "../account/account.models";

export interface UserEntity {
  name: string;
  email: string;
  password: string;
  accounts: AccountWithoutUserEmail[];
}

export interface UserResponse {
  name: string;
  email: string;
  accounts: AccountWithoutUserEmail[];
}

export interface AuthenticationRequest {
  email: string;
  password: string;
};

export interface AuthenticationResponse {
  token: string;
  user: UserResponse;
}