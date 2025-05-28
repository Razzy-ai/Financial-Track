import { apiClient } from "./apiClient";
import type{
  CreateTransactionTypeInput,
  UpdateTransactionTypeInput,
} from "finance-common";

export async function getTransactionTypes() {
  const res = await apiClient.get("/transaction-types");
  return res.data;
}

export async function createTransactionType(data: CreateTransactionTypeInput) {
  const res = await apiClient.post("/transaction-types", data);
  return res.data;
}

export async function updateTransactionType(id: string, data: UpdateTransactionTypeInput) {
  const res = await apiClient.put(`/transaction-types/${id}`, data);
  return res.data;
}

export async function deleteTransactionType(id: string) {
  const res = await apiClient.delete(`/transaction-types/${id}`);
  return res.data;
}
