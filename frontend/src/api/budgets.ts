import apiClient from "./apiClient";
import type {
  CreateBudgetInput,
  UpdateBudgetInput,
} from "finance-common";

const endpoint = "/budgets";

export const getBudgets = async () => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const createBudget = async (data: CreateBudgetInput) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const updateBudget = async (id: string, data: UpdateBudgetInput) => {
  const response = await apiClient.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteBudget = async (id: string) => {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
};
