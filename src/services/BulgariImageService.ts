// src/services/BullgariImageService.ts
import { BullgariImage } from "../models/BulgariImage";
import api from "./api"; // import the centralized api with interceptor token

interface ApiRow {
    id: string;
    title: string;
    imageBase64: string;
}

export async function fetchBullgariImages(): Promise<BullgariImage[]> {
    try {
        const { data } = await api.get<ApiRow[]>("/api/bullgari/images");
        return data.map((row) => ({
            id: row.id,
            title: row.title,
            dataUri: `data:image/jpeg;base64,${row.imageBase64}`,
        }));
    } catch (err: any) {
        console.error("fetchBullgariImages error:", err.response?.data || err.message);
        throw err;
    }
}

export async function addBullgariImage(title: string, imageBase64: string): Promise<void> {
    try {
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        await api.post("/api/bullgari/add-images", { title, imageBase64: cleanBase64 });
    } catch (err: any) {
        console.error("addBullgariImage error:", err.response?.data || err.message);
        throw err;
    }
}

export async function deleteBullgariImage(id: string): Promise<void> {
    try {
        await api.delete(`/api/bullgari/images-delete/${id}`);
    } catch (err: any) {
        console.error("deleteBullgariImage error:", err.response?.data || err.message);
        throw err;
    }
}

export async function updateBullgariImage(id: string, title: string, imageBase64?: string): Promise<void> {
    try {
        const payload: any = { title };
        if (imageBase64) {
            payload.imageBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        }
        await api.put(`/api/bullgari/images-update/${id}`, payload);
    } catch (err: any) {
        console.error("updateBullgariImage error:", err.response?.data || err.message);
        throw err;
    }
}
