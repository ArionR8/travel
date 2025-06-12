// src/viewmodels/useLogs.ts
import { useEffect, useState } from "react";
import { Log } from "../models/Log";
import { addLog, fetchLogs } from "../services/LogService";

export function useLogs() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const data = await fetchLogs();
            setLogs(data);
            setError(null);
        } catch (err: any) {
            console.error("❌ load logs error:", err.message);
            setError("Failed to fetch logs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const create = async (data: Partial<Log>) => {
        try {
            await addLog(data);
            setMessage("Log added");
            await load();
        } catch (err: any) {
            console.error("❌ create log error:", err.message);
            setError("Add log failed");
        }
    };

    return { logs, loading, error, message, create };
}
