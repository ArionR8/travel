import { useEffect, useState } from 'react';
import { Shteti } from '../models/Shteti';
import {
    addShteti,
    deleteShtet,
    fetchShtetet,
    updateShteti,
} from '../services/ShtetiService';

export function useShtete() {
    const [items, setItems] = useState<Shteti[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const sht = await fetchShtetet();
            setItems(sht);
            setError(null);
        } catch (err: any) {
            console.error('❌ fetchShtetet error:', err.response?.status, err.response?.data);
            setError('Failed to load shtete');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const create = async (data: Partial<Shteti>) => {
        try {
            await addShteti(data);
            setMessage('Added shtet');
            load();
        } catch (err: any) {
            console.error('❌ addShteti error:', err.response?.status, err.response?.data);
            setError('Add shtet failed');
        }
    };

    const modify = async (id: string, data: Partial<Shteti>) => {
        try {
            await updateShteti(id, data);
            setMessage('Updated shtet');
            load();
        } catch (err: any) {
            console.error('❌ updateShteti error:', err.response?.status, err.response?.data);
            setError('Update shtet failed');
        }
    };

    const remove = async (id: string) => {
        try {
            console.log('➡️ deleteShtet called with id:', id);
            await deleteShtet(id);
            console.log('✅ deleteShtet succeeded for id:', id);

            setMessage('Deleted shtet');
            setItems((v) => v.filter((i) => i.id !== id));
        } catch (err: any) {
            console.error('❌ deleteShtet error:', err.response?.status, err.response?.data);
            setError(`Delete shtet failed: ${err.message}`);
        }
    };

    return { items, loading, error, message, create, modify, remove };
}
