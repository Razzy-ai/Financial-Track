// frontend/types.ts (or inside your component files)


export type Category = {
  id: string;
  name: string;
  description?: string;
  transactionTypeId: string;
};

export type TransactionType = {
  id: string;
  name: string;
};

export type Transaction = {
  id: string;
  userId: string;
  title: string;
  amount: number;
  categoryId: string;
  transactionTypeId: string;
  createdAt: string;
  updatedAt: string;
};

export type SummaryItem = {
  category: string;
  amount: number;
};

export type Budget = {
  id: string;
  amount: number;
  categoryId: string;
  category: Category; 
};

export interface RecurringTransaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  frequency: string;
  nextDate: string;
  createdAt: string;
  updatedAt: string;
}
