import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://backend.rasikamohite731.workers.dev", // replace with your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
