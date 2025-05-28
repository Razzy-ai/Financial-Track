import apiClient from "./apiClient";
import type { UpdateUserSettingsInput } from "finance-common";

const endpoint = "/settings";

export const getSettings = async () => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const updateSettings = async (data: UpdateUserSettingsInput) => {
  const response = await apiClient.put(endpoint, data);
  return response.data;
};
