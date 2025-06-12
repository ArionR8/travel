import { useEffect, useState } from "react";
import { DubaiPrice } from "../models/DubaiPrice";
import {
    addDubaiPrice,
    deleteDubaiPrice,
    fetchDubaiPrices,
    updateDubaiPrice,
} from "../services/DubaiPriceService";

export function useDubaiPrices() {
    const [prices, setPrices] = useState<DubaiPrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const loadPrices = async () => {
        setLoading(true);
        try {
            const data = await fetchDubaiPrices();
            setPrices(data);
        } catch {
            setError("Failed to load Dubai prices");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPrices();
    }, []);

    const addPrice = async (price: Omit<DubaiPrice, "id">) => {
        try {
            await addDubaiPrice(price);
            setMessage("Price added successfully");
            await loadPrices();
        } catch {
            setError("Failed to add Dubai price");
        }
    };

    const deletePrice = async (id: string) => {
        try {
            await deleteDubaiPrice(id);
            setPrices((prev) => prev.filter((item) => item.id !== id));
            setMessage("Price deleted successfully");
        } catch {
            setError("Failed to delete Dubai price");
        }
    };

    const updatePrice = async (id: string, data: Partial<Omit<DubaiPrice, "id">>) => {
        try {
            await updateDubaiPrice(id, data);
            setMessage("Price updated successfully");
            await loadPrices();
        } catch {
            setError("Failed to update Dubai price");
        }
    };

    return {
        prices,
        loading,
        error,
        message,
        addPrice,
        deletePrice,
        updatePrice,
        reload: loadPrices,
    };
}
