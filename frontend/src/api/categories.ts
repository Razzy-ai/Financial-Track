import apiClient from "./apiClient";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "finance-common";

const endpoint = "/categories";

export const getCategories = async () => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const createCategory = async (data: CreateCategoryInput) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const updateCategory = async (
  id: string,
  data: UpdateCategoryInput
) => {
  const response = await apiClient.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
};

