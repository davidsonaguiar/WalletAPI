import { SaveAccountOutput } from "../account/account-models";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    accounts: SaveAccountOutput[];
}

export interface SaveUserInput {
    name: string;
    email: string;
    password: string;
}

export interface SaveUserOutput {
    id: string;
    name: string;
    email: string;
    accounts: SaveAccountOutput[];
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginOutput {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}
