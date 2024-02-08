import { TransactionEntity } from "../transaction/transaction.models";

export interface AccountEntity {
  id: number;
  name: string;
  userEmail: string;
  transactions: TransactionEntity[];
}

export interface CreateAccountRequest {
  name: string;
  userEmail: string;
}

export interface AccountWithoutUserEmail {
  id: number;
  name: string;
}