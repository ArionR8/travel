import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosHeaders } from "axios";
import { Airport } from "../models/Aeroporti";

const api = axios.create({
  baseURL: "http://172.22.32.1:5000/api",
  // withCredentials: true, // enable only if backend needs it
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

// Fetch all airports (if needed)
export async function fetchAirports(): Promise<Airport[]> {
  const { data } = await api.get<Airport[]>("/airports");
  return data;
}

// Fetch airports filtered by shtetiId
export async function fetchAirportsByShteti(
  shtetiId: string
): Promise<Airport[]> {
  const { data } = await api.get<Airport[]>(`/airports/by-shteti/${shtetiId}`);
  return data;
}

export async function addAirport(payload: Partial<Airport>): Promise<void> {
  await api.post("/add-airports", payload);
}

export async function updateAirport(
  id: string,
  payload: Partial<Airport>
): Promise<Airport> {
  const { data } = await api.put<Airport>(`/airports-update/${id}`, payload);
  return data;
}

export async function deleteAirport(id: string): Promise<void> {
  await api.delete(`/airports-delete/${id}`);
}
