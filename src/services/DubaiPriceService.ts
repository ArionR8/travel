import { DubaiPrice } from "../models/DubaiPrice";
import api from "./api";

export async function fetchDubaiPrices(): Promise<DubaiPrice[]> {
    try {
        const { data } = await api.get<DubaiPrice[]>("/api/dubai-price");
        return data;
    } catch (err: any) {
        console.error("fetchDubaiPrices error:", err.response?.data || err.message);
        throw err;
    }
}

export async function addDubaiPrice(payload: Omit<DubaiPrice, "id">): Promise<void> {
    try {
        await api.post("/api/add-dubai-price", payload);
    } catch (err: any) {
        console.error("addDubaiPrice error:", err.response?.data || err.message);
        throw err;
    }
}

export async function deleteDubaiPrice(id: string): Promise<void> {
    try {
        await api.delete(`/api/dubai-prices-delete/${id}`);
    } catch (err: any) {
        console.error("deleteDubaiPrice error:", err.response?.data || err.message);
        throw err;
    }
}

export async function updateDubaiPrice(id: string, updatedData: Partial<Omit<DubaiPrice, "id">>): Promise<void> {
    try {
        await api.put(`/api/dubai-prices-update/${id}`, updatedData);
    } catch (err: any) {
        console.error("updateDubaiPrice error:", err.response?.data || err.message);
        throw err;
    }
}
