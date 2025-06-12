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
    const [count, setCount] = useState<number>(0);  // new state for count
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const arr = await fetchAranzhmanet();
            setItems(arr);

            // fetch count too
            const c = await countAranzhmanet();
            setCount(c);
        } catch (err) {
            console.error("fetchAranzhmanet or countAranzhmanet error:", err);
            setError('Failed to load');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const create = async (data: Partial<Aranzhmani>) => {
        try {
            await addAranzhmani(data);
            setMessage('Added');
            await load();  // refresh items and count
        } catch {
            setError('Add failed');
        }
    };

    const modify = async (id: string, data: Partial<Aranzhmani>) => {
        try {
            await updateAranzhmani(id, data);
            setMessage('Updated');
            await load();
        } catch {
            setError('Update failed');
        }
    };

    const remove = async (id: string) => {
        try {
            await deleteAranzhmani(id);
            setMessage('Deleted');
            setItems(v => v.filter(i => i.id !== id));
            // update count after deletion
            setCount(c => c - 1);
        } catch {
            setError('Delete failed');
        }
    };

    return { items, count, loading, error, message, create, modify, remove };
}
