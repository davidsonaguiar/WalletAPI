import { sign } from "jsonwebtoken";
import { hash, genSalt, compare } from "bcrypt";

import { LoginInput, LoginOutput, SaveUserInput, SaveUserOutput } from "./user-models";
import { UserRepositoryProtocol } from "./protocols/user-repository-protocol";
import { ErrorStandard } from "../../error/error-standard";
import { PasswordEncrypterProtocol } from "./protocols/password-encrypter-protocol";
import { JwtProtocol } from "./protocols/jwt-protocol";

export class UserService {
    private readonly userRepository: UserRepositoryProtocol;
    private readonly passwordEncrypter: PasswordEncrypterProtocol;
    private readonly jwt: JwtProtocol;

    constructor(
        userRepository: UserRepositoryProtocol,
        passwordEncrypter: PasswordEncrypterProtocol,
        jwt: JwtProtocol
    ) {
        this.userRepository = userRepository;
        this.passwordEncrypter = passwordEncrypter;
        this.jwt = jwt;
    }

    async save(input: SaveUserInput): Promise<LoginOutput> {
        const emailExists = await this.userRepository.emailExists(input.email);
        if (emailExists) throw new ErrorStandard("Email already exists", 409);
        input.password = await this.passwordEncrypter.encrypt(input.password);
        const userSaved = await this.userRepository.save(input);
        return {
            user: {
                id: userSaved.id,
                email: userSaved.email,
                name: userSaved.name,
            },
            token: await this.jwt.sign(userSaved),
        };
    }

    async login(input: LoginInput): Promise<LoginOutput> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) throw new ErrorStandard("Email or Password invalid", 401);
        const passwordMatch = await compare(input.password, user.password);
        if (!passwordMatch) throw new ErrorStandard("Email or Password invalid", 401);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token: await this.jwt.sign(user),
        };
    }
}
