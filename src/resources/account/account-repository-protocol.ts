import { SaveAccountInput, SaveAccountOutput } from "./account-models";

export interface AccountRepositoryProtocol {
    save(userId: string, input: SaveAccountInput): Promise<SaveAccountOutput>;
    findById(accountId: string): Promise<SaveAccountOutput | null>;
    findByUserId(userId: string): Promise<SaveAccountOutput[]>;
    update(accountId: string, input: SaveAccountInput): Promise<SaveAccountOutput>;
    delete(accountId: string): Promise<void>;
}
