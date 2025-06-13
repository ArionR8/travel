// src/services/LogService.ts
import { Log } from "../models/Log";
import api from "./api"; // centralized axios instance with token interceptor

export async function fetchLogs(): Promise<Log[]> {
    try {
        const { data } = await api.get<Log[]>("/api/logs");
        return data;
    } catch (err: any) {
        console.error("❌ fetchLogs error:", err.response?.data || err.message);
        throw err;
    }
}

// Opsionale nëse do ta aktivizosh më vonë për krijim të log-ut
export async function addLog(payload: Partial<Log>): Promise<void> {
    try {
        await api.post("/api/logs", payload);
    } catch (err: any) {
        console.error("❌ addLog error:", err.response?.data || err.message);
        throw err;
    }
}
