import { AccountEntity } from "./account.models";
import { AccountRepositoryProtocol } from "./account.repository.protocol";

class AccountRepositoryInMemory implements AccountRepositoryProtocol {
  private accounts: AccountEntity[] = [];

  async findByUserEmail(email: string) {
    const accounts = this.accounts.filter((account) => account.userEmail === email);
    return accounts;
  }
  async save(account: AccountEntity) {
    this.accounts.push(account);
  }
}

export default new AccountRepositoryInMemory();
