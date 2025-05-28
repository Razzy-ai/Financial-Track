import { apiClient } from "./apiClient";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "finance-common";

export async function getCategories() {
  const res = await apiClient.get("/categories");
  return res.data;
}

export async function createCategory(data: CreateCategoryInput) {
  const res = await apiClient.post("/categories", data);
  return res.data;
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  const res = await apiClient.put(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id: string) {
  const res = await apiClient.delete(`/categories/${id}`);
  return res.data;
}


