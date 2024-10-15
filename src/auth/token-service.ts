import { JwtProtocol } from "../resources/user/protocols/jwt-protocol";
import { Algorithm, sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
import { SaveUserOutput } from "../resources/user/user-models";
import { ErrorStandard } from "../error/error-standard";

config();

export class TokenService implements JwtProtocol {
    private readonly SECRET: string = process.env.PORT || "secret";
    private readonly EXPIRES_IN: string = "1d";
    private readonly ALGORITHM: Algorithm = "HS256";

    async sign(input: SaveUserOutput): Promise<string> {
        return sign(input, this.SECRET, {
            algorithm: this.ALGORITHM,
            expiresIn: this.EXPIRES_IN,
        });
    }

    async verify(token: string): Promise<SaveUserOutput> {
        const decoded = verify(token, this.SECRET);
        if (typeof decoded === "string") throw new ErrorStandard("Invalid token", 401);
        return {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
        };
    }
}
