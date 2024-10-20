export type Account = {
  id: string;
  name: string;
  balance: number;
  userId: string;
}


export type SaveAccountInput = Omit<Account, "id">;
export type AccountWithoutUserId = Omit<Account, "userId">;
export type UpdateAccountInput = Omit<Account, "userId">;