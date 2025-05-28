import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8787/api", // replace with your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
