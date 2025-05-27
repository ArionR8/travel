import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosHeaders } from "axios";
import { Shteti } from "../models/Shteti";

const api = axios.create({
  baseURL: "http://172.22.32.1:5000/api",
  // withCredentials: true, // only if your backend needs it
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      } else if (!(config.headers instanceof AxiosHeaders)) {
        config.headers = new AxiosHeaders(config.headers);
      }
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export async function fetchShtetet(): Promise<Shteti[]> {
  const { data } = await api.get<Shteti[]>("/shtetet");
  return data;
}

export async function addShteti(payload: Partial<Shteti>): Promise<void> {
  await api.post("/add-shtetin", payload);
}

export async function updateShteti(
  id: string,
  payload: Partial<Shteti>
): Promise<Shteti> {
  const { data } = await api.put<Shteti>(`/shtetin-update/${id}`, payload);
  return data;
}

export async function deleteShtet(id: string): Promise<void> {
  await api.delete(`/shtetin-delete/${id}`);
}
