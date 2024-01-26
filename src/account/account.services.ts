import { AccountEntity, AccountInput } from "./account.models";
import { AccountRepositoryProtocol } from "./account.repository.protocol";

export class AccountServices {

  constructor(
    private readonly repository: AccountRepositoryProtocol
  ){}

  async handleCreateAccount(input: AccountInput): Promise<AccountEntity> {
    const accountAlreadyExists = await this.repository.findAccountByEmail(input.userEmail);
    if (!accountAlreadyExists) throw new Error("Não há uma conta com esse email");
    const newAccount = await this.repository.createAccount(input);
    return newAccount;
  }

}