import { Category } from "../category/category.models";

export interface TransactionEntity {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: Date;
  idAccount: number;
}