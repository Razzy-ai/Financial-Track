import apiClient from "./apiClient";
import type {
  CreateRecurringTransactionInput,
  UpdateRecurringTransactionInput,
} from "finance-common";

const endpoint = "/recurring-transactions";

export const getRecurringTransactions = async () => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const createRecurringTransaction = async (
  data: CreateRecurringTransactionInput
) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const updateRecurringTransaction = async (
  id: string,
  data: UpdateRecurringTransactionInput
) => {
  const response = await apiClient.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteRecurringTransaction = async (id: string) => {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
};
