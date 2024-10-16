import { AccountRepositoryProtocol } from "./protocols/account-repository-protocol";
import { UserRepositoryProtocol } from "../user/protocols/user-repository-protocol";
import { SaveAccountInput, SaveAccountOutput } from "./account-models";
import { ErrorStandard } from "../../error/error-standard";

export class AccountService {
    constructor(
        private readonly accountRepository: AccountRepositoryProtocol,
        private readonly UserRepositoryProtocol: UserRepositoryProtocol
    ) {}

    async save(userId: string, input: SaveAccountInput): Promise<SaveAccountOutput> {
        const user = await this.UserRepositoryProtocol.findById(userId);
        if (!user) throw new ErrorStandard("User not found", 404);
        user.accounts.forEach((account) => {
            if (account.name === input.name) throw new ErrorStandard("Name already exists", 409);
        });
        return await this.accountRepository.save(userId, input);
    }

    async findAccounts(userId: string): Promise<SaveAccountOutput[]> {
        const user = await this.UserRepositoryProtocol.findById(userId);
        if (!user) throw new ErrorStandard("Authorization error", 401);
        return await this.accountRepository.findByUserId(userId);
    }

    async findAccountById(accountId: string): Promise<SaveAccountOutput> {
        const account = await this.accountRepository.findById(accountId);
        if (!account) throw new ErrorStandard("Account not found", 404);
        return account;
    }

    async updateAccount(
        userId: string,
        accountId: string,
        input: SaveAccountInput
    ): Promise<SaveAccountOutput> {
        const user = await this.UserRepositoryProtocol.findById(userId);
        if (!user) throw new ErrorStandard("Authorization error", 401);
        const accountFound = user.accounts.find((account) => account.id === accountId);
        if (!accountFound) throw new ErrorStandard("Account not found", 404);
        return await this.accountRepository.update(accountId, input);
    }

    async deleteAccount(userId: string, accountId: string): Promise<void> {
        const user = await this.UserRepositoryProtocol.findById(userId);
        if (!user) throw new ErrorStandard("Authorization error", 401);
        const accountFound = user.accounts.find((account) => account.id === accountId);
        if (!accountFound) throw new ErrorStandard("Account not found", 404);
        await this.accountRepository.delete(accountId);
    }
}
