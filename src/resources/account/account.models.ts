export interface AccountEntity {
  id: number;
  name: string;
  userEmail: string;
}

export type AccountInput = Omit<AccountEntity, "id">;
