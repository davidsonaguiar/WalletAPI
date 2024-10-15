import { AccountEntity, AccountInput } from "./account.models";

export interface AccountRepositoryProtocol {
  createAccount(account: AccountInput): Promise<AccountEntity>;
  findAccountById(accountId: number): Promise<AccountEntity | undefined>;
  findAccountByEmail(accountEmail: string): Promise<AccountEntity | undefined>;
  updateAccount(account: AccountEntity): Promise<AccountEntity>;
  deleteAccount(accountId: number): Promise<void>;
}