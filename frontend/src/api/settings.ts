import { apiClient } from "./apiClient";
import type{
  createUserSettingsInput,
  UpdateUserSettingsInput,
} from "finance-common";

export async function getSettings() {
  const res = await apiClient.get("/settings");
  return res.data;
}

export async function createSettings(data: createUserSettingsInput) {
  const res = await apiClient.post("/settings", data);
  return res.data;
}

export async function updateSettings(id: string, data: UpdateUserSettingsInput) {
  const res = await apiClient.put(`/settings/${id}`, data);
  return res.data;
}
