import { apiClient } from "./apiClient";
import type{
  CreateTransactionNoteInput,
  UpdateTransactionNoteInput,
} from "finance-common";

export async function getNotes() {
  const res = await apiClient.get("/transactionNotes");
  return res.data;
}

export async function createNote(data: CreateTransactionNoteInput) {
  const res = await apiClient.post("/transactionNotes", data);
  return res.data;
}

export async function updateNote(id: string, data: UpdateTransactionNoteInput) {
  const res = await apiClient.put(`/transactionNotes/${id}`, data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await apiClient.delete(`/transactionNotes/${id}`);
  return res.data;
}
