import { TransactionEntity } from "../transaction/transaction.models";

export interface AccountEntity {
  id: number;
  name: string;
  amount: number;
  email: string;
  transactions: TransactionEntity[];
}

export interface CreateAccountRequest {
  name: string;
  email: string;
  amount: number;
}

export interface AccountWithoutUserEmail {
  id: number;
  name: string;
  amount: number;
  transactions: TransactionEntity[];
} 