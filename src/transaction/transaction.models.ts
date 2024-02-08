export interface TransactionEntity {
  id: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  category: string;
  date: Date;
  idAccount: number;
}