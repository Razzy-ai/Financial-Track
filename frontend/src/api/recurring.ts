import { apiClient } from "./apiClient";
import type{
  CreateRecurringTransactionInput,
  UpdateRecurringTransactionInput,
} from "finance-common";

export async function getRecurringTransactions() {
  const res = await apiClient.get("/recurringTransactions");
  return res.data;
}

export async function createRecurringTransaction(data: CreateRecurringTransactionInput) {
  const res = await apiClient.post("/recurringTransactions", data);
  return res.data;
}

export async function updateRecurringTransaction(id: string, data: UpdateRecurringTransactionInput) {
  const res = await apiClient.put(`/recurringTransactions/${id}`, data);
  return res.data;
}

export async function deleteRecurringTransaction(id: string) {
  const res = await apiClient.delete(`/recurringTransactions/${id}`);
  return res.data;
}
