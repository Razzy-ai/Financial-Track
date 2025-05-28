import apiClient from "./apiClient";
import type {
  CreateTransactionTagInput,
  UpdateTransactionTagInput,
} from "finance-common";

const endpoint = "/tags";

export const getTags = async () => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const createTag = async (data: CreateTransactionTagInput) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const updateTag = async (id: string, data: UpdateTransactionTagInput) => {
  const response = await apiClient.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteTag = async (id: string) => {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
};
