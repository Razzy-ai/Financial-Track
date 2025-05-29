// frontend/types.ts (or inside your component files)

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type TransactionType = {
  id: string;
  name: string;
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  userId: string;
  categoryId: string;
  typeId: string;
};
