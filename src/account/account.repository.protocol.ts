import { AccountEntity, AccountWithoutUserEmail } from "./account.models";

export interface AccountRepositoryProtocol {
  findByUserEmail: (email: string) => Promise<AccountWithoutUserEmail[]>;
  save: (account: AccountEntity) => Promise<void>;
}