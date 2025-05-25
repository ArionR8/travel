// viewmodels/useAranzhmani.ts
import { useEffect, useState } from 'react';
import { Aranzhmani } from '../models/Aranzhmani';
import { addAranzhmani, deleteAranzhmani, fetchAranzhmanet, updateAranzhmani } from '../services/ArazhmaniService';

export function useAranzhmani() {
    const [items, setItems] = useState<Aranzhmani[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const arr = await fetchAranzhmanet();
            setItems(arr);
        } catch {
            setError('Failed to load');
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const create = async (data: Partial<Aranzhmani>) => {
        try {
            await addAranzhmani(data);
            setMessage('Added');
            load();
        } catch { setError('Add failed'); }
    };
    const modify = async (id: string, data: Partial<Aranzhmani>) => {
        try {
            await updateAranzhmani(id, data);
            setMessage('Updated');
            load();
        } catch { setError('Update failed'); }
    };
    const remove = async (id: string) => {
        try { await deleteAranzhmani(id); setMessage('Deleted'); setItems(v => v.filter(i => i.id !== id)); }
        catch { setError('Delete failed'); }
    };

    return { items, loading, error, message, create, modify, remove };
}