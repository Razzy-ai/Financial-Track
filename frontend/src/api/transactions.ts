import { apiClient } from "./apiClient";
import  type {CreateTransactionInput, UpdateTransactionInput} from "finance-common";

export async function getTransactions() {
  const res = await apiClient.get("/transactions");
  return res.data;
}

export async function createTransaction(data: CreateTransactionInput) {
  const res = await apiClient.post("/transactions", data);
  return res.data;
}

export async function updateTransaction(id: string, data: UpdateTransactionInput) {
  const res = await apiClient.put(`/transactions/${id}`, data);
  return res.data;
}

export async function deleteTransaction(id: string) {
  const res = await apiClient.delete(`/transactions/${id}`);
  return res.data;
}
