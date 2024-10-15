import { SaveAccountInput, SaveAccountOutput } from "./account-models";

export interface AccountRepositoryProtocol {
    findByUserId(userId: string): Promise<SaveAccountOutput[]>;
    save(userId: string, input: SaveAccountInput): Promise<SaveAccountOutput>;
}
