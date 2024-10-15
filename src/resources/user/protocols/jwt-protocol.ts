import { SaveUserOutput } from './../user-models';


export interface JwtProtocol {
    sign(input: SaveUserOutput): Promise<string>;
    verify(token: string): Promise<SaveUserOutput>;
}