import { AccountWithoutUserId } from "../account/account-models";
import { CategoryWithoutUserId } from "../category/category-models";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    accounts: AccountWithoutUserId[];
    categories: CategoryWithoutUserId[];
};

export type SaveUserInput = Omit<User, "id" | "accounts" | "categories">;
export type SaveUserOutput = Omit<User, "accounts" | "password" | "categories">;
export type LoginInput = Pick<User, "email" | "password">;
export type LoginOutput = {
    user: Omit<User, "accounts" | "password" | "categories">;
    token: string;
};
