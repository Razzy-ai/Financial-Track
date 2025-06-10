import { apiClient } from "./apiClient";
import type{
  createUserSettingsInput,
  UpdateUserSettingsInput,
} from "finance-common";

export async function getSettings() {
  const res = await apiClient.get("/userSettings");
  return res.data;
}

export async function createSettings(data: createUserSettingsInput) {
  const res = await apiClient.post("/userSettings", data);
  return res.data;
}

export async function updateSettings(id: string, data: UpdateUserSettingsInput) {
  const res = await apiClient.put(`/userSettings/${id}`, data);
  return res.data;
}
