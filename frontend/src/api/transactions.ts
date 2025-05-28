import apiClient from "./apiClient";
import type { CreateTransactionInput,UpdateTransactionInput} from "finance-common";

const endpoint = "/transactions";

export const getTransactions = async () => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const createTransaction = async (data: CreateTransactionInput) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const updateTransaction = async (
  id: string,
  data: UpdateTransactionInput
) => {
  const response = await apiClient.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
};
