import { useEffect, useState } from 'react';
import { Airport } from '../models/Aeroporti';
import { addAirport, deleteAirport, fetchAirports, updateAirport } from '../services/AeroportiService';

export function useAirport() {
    const [items, setItems] = useState<Airport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const airports = await fetchAirports();
            setItems(airports);
        } catch {
            setError('Failed to load airports');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const create = async (data: Partial<Airport>) => {
        try {
            await addAirport(data);
            setMessage('Added airport');
            load();
        } catch {
            setError('Add airport failed');
        }
    };

    const modify = async (id: string, data: Partial<Airport>) => {
        try {
            await updateAirport(id, data);
            setMessage('Updated airport');
            load();
        } catch {
            setError('Update airport failed');
        }
    };

    const remove = async (id: string) => {
        try {
            await deleteAirport(id);
            setMessage('Deleted airport');
            setItems(v => v.filter(i => i.id !== id));
        } catch {
            setError('Delete airport failed');
        }
    };

    return { items, loading, error, message, create, modify, remove };
}
