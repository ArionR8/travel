// src/services/AeroportiService.ts
import { Airport } from "../models/Aeroporti";
import api from "./api"; // centralized axios instance with interceptor token

export async function fetchAirports(): Promise<Airport[]> {
  try {
    const { data } = await api.get<Airport[]>("/api/airports"); // note the /api prefix here
    return data;
  } catch (err: any) {
    console.error("fetchAirports error:", err.response?.data || err.message);
    throw err;
  }
}

export async function fetchAirportsByShteti(shtetiId: string): Promise<Airport[]> {
  try {
    const { data } = await api.get<Airport[]>(`/api/airports/by-shteti/${shtetiId}`);
    return data;
  } catch (err: any) {
    console.error("fetchAirportsByShteti error:", err.response?.data || err.message);
    throw err;
  }
}

export async function addAirport(payload: Partial<Airport>): Promise<void> {
  try {
    await api.post("/api/add-airports", payload);
  } catch (err: any) {
    console.error("addAirport error:", err.response?.data || err.message);
    throw err;
  }
}

export async function updateAirport(id: string, payload: Partial<Airport>): Promise<Airport> {
  try {
    const { data } = await api.put<Airport>(`/api/airports-update/${id}`, payload);
    return data;
  } catch (err: any) {
    console.error("updateAirport error:", err.response?.data || err.message);
    throw err;
  }
}

export async function deleteAirport(id: string): Promise<void> {
  try {
    await api.delete(`/api/airports-delete/${id}`);
  } catch (err: any) {
    console.error("deleteAirport error:", err.response?.data || err.message);
    throw err;
  }
}
