import { apiClient } from "./apiClient";
import type{
  CreateTransactionTagInput,
  UpdateTransactionTagInput,
} from "finance-common";

export async function getTags() {
  const res = await apiClient.get("/tags");
  return res.data;
}

export async function createTag(data: CreateTransactionTagInput) {
  const res = await apiClient.post("/tags", data);
  return res.data;
}

export async function updateTag(id: string, data: UpdateTransactionTagInput) {
  const res = await apiClient.put(`/tags/${id}`, data);
  return res.data;
}

export async function deleteTag(id: string) {
  const res = await apiClient.delete(`/tags/${id}`);
  return res.data;
}
