import { AccountRepositoryProtocol } from "./account-repository-protocol";
import { UserRepositoryProtocol } from "../user/protocols/user-repository-protocol";
import { SaveAccountInput, SaveAccountOutput } from "./account-models";
import { ErrorStandard } from "../../error/error-standard";

export class AccountService {
    private readonly accountRepository: AccountRepositoryProtocol;
    private readonly UserRepositoryProtocol: UserRepositoryProtocol;

    constructor(
        accountRepository: AccountRepositoryProtocol,
        UserRepositoryProtocol: UserRepositoryProtocol
    ) {
        this.accountRepository = accountRepository;
        this.UserRepositoryProtocol = UserRepositoryProtocol;
    }

    async save(userId: string, input: SaveAccountInput): Promise<SaveAccountOutput> {
        const user = await this.UserRepositoryProtocol.findById(userId);
        if(!user) throw new ErrorStandard("User not found", 404);
        const userAccounts = await this.accountRepository.findByUserId(userId);
        userAccounts.forEach((account) => {
            if(account.name === input.name) 
                throw new ErrorStandard("Name already exists", 409);
        });
        return await this.accountRepository.save(userId, input);
    }
}
