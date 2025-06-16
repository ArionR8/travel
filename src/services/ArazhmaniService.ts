import { Aranzhmani } from '../models/Aranzhmani';
import api from './api';

export async function fetchAranzhmanet(): Promise<Aranzhmani[]> {
    try {
        const res = await api.get("/api/aranzhmanet");
        return res.data as Aranzhmani[];
    } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Failed to fetch offers');
    }
}

export async function addAranzhmani(payload: Partial<Aranzhmani>): Promise<void> {
    try {
        await api.post('/api/add-Aranzhmani', payload);
    } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Failed to add offer');
    }
}

export async function updateAranzhmani(id: string, payload: Partial<Aranzhmani>): Promise<Aranzhmani> {
    try {
        const { data } = await api.put<Aranzhmani>(`/api/Aranzhmani-update/${id}`, payload);
        return data;
    } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Failed to update offer');
    }
}

export async function deleteAranzhmani(id: string): Promise<void> {
    try {
        await api.delete(`/api/Aranzhmani-delete/${id}`);
    } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Failed to delete offer');
    }
}

// NEW: Count functionality
export async function countAranzhmanet(): Promise<number> {
    try {
        const res = await api.get('/api/aranzhmanet/count');
        return res.data.count;
    } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Failed to get offer count');
    }
}