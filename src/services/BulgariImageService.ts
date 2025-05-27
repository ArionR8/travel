// src/services/BullgariImageService.ts
import axios from "axios";
import { BullgariImage } from "../models/BulgariImage";

const api = axios.create({
    baseURL: "http://172.22.32.1:5000/api",
});

interface ApiRow {
    id: string;
    title: string;
    imageBase64: string;
}

export async function fetchBullgariImages(): Promise<BullgariImage[]> {
    const { data } = await api.get<ApiRow[]>("/bullgari/images");
    return data.map((row) => ({
        id: row.id,
        title: row.title,
        dataUri: `data:image/jpeg;base64,${row.imageBase64}`,
    }));
}

export async function addBullgariImage(title: string, imageBase64: string): Promise<void> {
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    await api.post("/bullgari/add-images", { title, imageBase64: cleanBase64 });
}

export async function deleteBullgariImage(id: string): Promise<void> {
    await api.delete(`/bullgari/images-delete/${id}`);
}

export async function updateBullgariImage(id: string, title: string, imageBase64?: string): Promise<void> {
    const payload: any = { title };
    if (imageBase64) {
        payload.imageBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    }
    await api.put(`/bullgari/images-update/${id}`, payload);
}
