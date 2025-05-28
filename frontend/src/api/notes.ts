import apiClient from "./apiClient";
import type {
  CreateTransactionNoteInput,
  UpdateTransactionNoteInput,
} from "finance-common";

const endpoint = "/notes";

export const getNotes = async () => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const createNote = async (data: CreateTransactionNoteInput) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const updateNote = async (id: string, data: UpdateTransactionNoteInput) => {
  const response = await apiClient.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await apiClient.delete(`${endpoint}/${id}`);
  return response.data;
};
