import { apiClient } from "./apiClient";
import type{
  CreateTransactionTagInput,
  UpdateTransactionTagInput,
} from "finance-common";

export async function getTags() {
  const res = await apiClient.get("/transactionTags");
  return res.data;
}

export async function createTag(data: CreateTransactionTagInput) {
  const res = await apiClient.post("/transactionTags", data);
  return res.data;
}

export async function updateTag(id: string, data: UpdateTransactionTagInput) {
  const res = await apiClient.put(`/transactionTags/${id}`, data);
  return res.data;
}

export async function deleteTag(id: string) {
  const res = await apiClient.delete(`/transactionTags/${id}`);
  return res.data;
}
