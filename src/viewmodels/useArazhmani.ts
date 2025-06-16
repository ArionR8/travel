import { useEffect, useState } from 'react';
import { Aranzhmani } from '../models/Aranzhmani';
import {
    addAranzhmani,
    countAranzhmanet,
    deleteAranzhmani,
    fetchAranzhmanet,
    updateAranzhmani
} from '../services/ArazhmaniService';

export function useAranzhmani() {
    const [items, setItems] = useState<Aranzhmani[]>([]);
    const [count, setCount] = useState<number>(0);  // NEW: Count state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [arr, cnt] = await Promise.all([
                fetchAranzhmanet(),
                countAranzhmanet()  // NEW: Fetch count simultaneously
            ]);
            setItems(arr);
            setCount(cnt);  // NEW: Set count
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const create = async (data: Partial<Aranzhmani>) => {
        try {
            await addAranzhmani(data);
            setMessage('Offer added successfully');
            loadData();  // Refresh data and count
        } catch (err: any) {
            setError(err.message);
        }
    };

    const modify = async (id: string, data: Partial<Aranzhmani>) => {
        try {
            await updateAranzhmani(id, data);
            setMessage('Offer updated successfully');
            loadData();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const remove = async (id: string) => {
        try {
            await deleteAranzhmani(id);
            setMessage('Offer deleted successfully');
            loadData();
        } catch (err: any) {
            setError(err.message);
        }
    };

    // NEW: Return count with other values
    return {
        items,
        count,
        loading,
        error,
        message,
        create,
        modify,
        remove,
        refresh: loadData  // NEW: Expose refresh function
    };
}