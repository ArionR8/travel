// src/services/ContactService.ts
import api from "./api";

interface ContactFormData {
    name: string;
    email: string;
    number: string;
    message: string;
}

export async function sendContactMessage(formData: ContactFormData): Promise<{ message: string }> {
    try {
        const { data } = await api.post<{ message: string }>("/api/contact", formData);
        return data;
    } catch (err: any) {
        console.error("❌ sendContactMessage error:", err.response?.data || err.message);
        throw err;
    }
}
