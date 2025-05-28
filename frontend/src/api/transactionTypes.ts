import apiClient from "./apiClient";
import type { CreateTransactionTypeInput, UpdateTransactionTypeInput } from "finance-common";

const endpoint = "/transaction-types";

export const getTransactionTypes = async () => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const createTransactionType = async (data: CreateTransactionTypeInput) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const updateTransactionType = async (
  id: string,
  data: UpdateTransactionTypeInput
) => {
  const response = await apiClient.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteTransactionType = async (id: string) => {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
};
