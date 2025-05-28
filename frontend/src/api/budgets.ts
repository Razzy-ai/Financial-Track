import { apiClient } from "./apiClient";
import type {
  CreateBudgetInput,
  UpdateBudgetInput,
} from "finance-common";

export async function getBudgets() {
  const res = await apiClient.get("/budgets");
  return res.data;
}

export async function createBudget(data: CreateBudgetInput) {
  const res = await apiClient.post("/budgets", data);
  return res.data;
}

export async function updateBudget(id: string, data: UpdateBudgetInput) {
  const res = await apiClient.put(`/budgets/${id}`, data);
  return res.data;
}

export async function deleteBudget(id: string) {
  const res = await apiClient.delete(`/budgets/${id}`);
  return res.data;
}

