import axios from "axios";
import { API } from "./constants";

export const client = axios.create({
  baseURL: API.URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    throw error.response;
  },
);
