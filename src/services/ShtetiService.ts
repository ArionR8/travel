// src/services/ShtetiService.ts
import { Shteti } from "../models/Shteti";
import api from "./api"; // centralized axios instance with interceptor token

export async function fetchShtetet(): Promise<Shteti[]> {
  try {
    const { data } = await api.get<Shteti[]>("/api/shtetet");
    return data;
  } catch (err: any) {
    console.error("fetchShtetet error:", err.response?.data || err.message);
    throw err;
  }
}

export async function addShteti(payload: Partial<Shteti>): Promise<void> {
  try {
    await api.post("/api/add-shtetin", payload);
  } catch (err: any) {
    console.error("addShteti error:", err.response?.data || err.message);
    throw err;
  }
}

export async function updateShteti(id: string, payload: Partial<Shteti>): Promise<Shteti> {
  try {
    const { data } = await api.put<Shteti>(`/api/shtetin-update/${id}`, payload);
    return data;
  } catch (err: any) {
    console.error("updateShteti error:", err.response?.data || err.message);
    throw err;
  }
}

export async function deleteShtet(id: string): Promise<void> {
  try {
    await api.delete(`/api/shtetin-delete/${id}`);
  } catch (err: any) {
    console.error("deleteShtet error:", err.response?.data || err.message);
    throw err;
  }
}
