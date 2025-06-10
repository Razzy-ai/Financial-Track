import { apiClient } from "./apiClient";
import type{
  CreateTransactionTypeInput,
  UpdateTransactionTypeInput,
} from "finance-common";

export async function getTransactionTypes() {
  const res = await apiClient.get("/transactionTypes");
  return res.data;
}

export async function createTransactionType(data: CreateTransactionTypeInput) {
  const res = await apiClient.post("/transactionTypes", data);
  return res.data;
}

export async function updateTransactionType(id: string, data: UpdateTransactionTypeInput) {
  const res = await apiClient.put(`/transactionTypes/${id}`, data);
  return res.data;
}

export async function deleteTransactionType(id: string) {
  const res = await apiClient.delete(`/transactionTypes/${id}`);
  return res.data;
}
