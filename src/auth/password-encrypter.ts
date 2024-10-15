import bcrypt from "bcrypt";

import { PasswordEncrypterProtocol } from "../resources/user/protocols/password-encrypter-protocol";

export class PasswordEncrypter implements PasswordEncrypterProtocol {
    async encrypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    }

    async compare(password: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordHashed);
    }
}