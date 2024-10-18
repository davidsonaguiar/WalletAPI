import { SaveAccountInput, AccountWithoutUserId, UpdateAccountInput } from "../account-models";

export interface AccountRepositoryProtocol {
    save(input: SaveAccountInput): Promise<AccountWithoutUserId>;
    findById(accountId: string): Promise<AccountWithoutUserId | null>;
    findByUserId(userId: string): Promise<AccountWithoutUserId[]>;
    update(input: UpdateAccountInput): Promise<AccountWithoutUserId>;
    delete(accountId: string): Promise<void>;
}
