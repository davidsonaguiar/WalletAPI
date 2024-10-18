import { AccountRepositoryProtocol } from "./protocols/account-repository-protocol";
import { UserRepositoryProtocol } from "../user/protocols/user-repository-protocol";
import { SaveAccountInput, AccountWithoutUserId, UpdateAccountInput } from "./account-models";
import { ErrorStandard } from "../../error/error-standard";

export class AccountService {
    constructor(
        private readonly accountRepository: AccountRepositoryProtocol,
        private readonly UserRepositoryProtocol: UserRepositoryProtocol
    ) {}

    async save(input: SaveAccountInput): Promise<AccountWithoutUserId> {
        const user = await this.UserRepositoryProtocol.findById(input.userId);
        if (!user) throw new ErrorStandard("User not found", 404);
        user.accounts.forEach((account) => {
            if (account.name === input.name) throw new ErrorStandard("Name already exists", 409);
        });
        return await this.accountRepository.save(input);
    }

    async findAccounts(userId: string): Promise<AccountWithoutUserId[]> {
        const user = await this.UserRepositoryProtocol.findById(userId);
        if (!user) throw new ErrorStandard("Authorization error", 401);
        return await this.accountRepository.findByUserId(userId);
    }

    async findAccountById(accountId: string): Promise<AccountWithoutUserId> {
        const account = await this.accountRepository.findById(accountId);
        if (!account) throw new ErrorStandard("Account not found", 404);
        return account;
    }

    async updateAccount(userId: string, input: UpdateAccountInput): Promise<AccountWithoutUserId> {
        const user = await this.UserRepositoryProtocol.findById(userId);
        if (!user) throw new ErrorStandard("Authorization error", 401);
        const accountFound = user.accounts.find((account) => account.id === input.id);
        if (!accountFound) throw new ErrorStandard("Account not found", 404);
        return await this.accountRepository.update(input);
    }

    async deleteAccount(userId: string, accountId: string): Promise<void> {
        const user = await this.UserRepositoryProtocol.findById(userId);
        if (!user) throw new ErrorStandard("Authorization error", 401);
        const accountFound = user.accounts.find((account) => account.id === accountId);
        if (!accountFound) throw new ErrorStandard("Account not found", 404);
        await this.accountRepository.delete(accountId);
    }
}
