import { randomInt } from "crypto";
import { AccountEntity, AccountWithoutUserEmail, CreateAccountRequest } from "./account.models";
import { AccountRepositoryProtocol } from "./account.repository.protocol";
import { UserRepositoryProtocol } from "../user/user.repository.protocol";

export class AccountServices {

  constructor(
    private readonly userRepository: UserRepositoryProtocol,
    private readonly accountRepository: AccountRepositoryProtocol
  ){}

  async CreateAccount(input: CreateAccountRequest): Promise<AccountEntity> {
    const accounts = await this.accountRepository.findByUserEmail(input.email);
    const accountAlreadyExists = accounts.find(account => account.name === input.name);
    if(accountAlreadyExists) throw new Error("Account already exists");
    const id = randomInt(1, 1000);
    await this.accountRepository.save({ ...input, id, transactions: []});
    return {
      id,
      name: input.name,
      email: input.email,
      amount: input.amount,
      transactions: []
    }
  }

  async GetByUserEmail(userEmail: string): Promise<AccountWithoutUserEmail[]> {
    const useExists = await this.userRepository.emailExists(userEmail);
    if(!useExists) throw new Error("User does not exists");
    const accounts = await this.accountRepository.findByUserEmail(userEmail);
    return accounts;
  }

}