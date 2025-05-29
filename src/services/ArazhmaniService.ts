import { Aranzhmani } from '../models/Aranzhmani';
import api from './api'; // import your centralized api with interceptor token

export async function fetchAranzhmanet(): Promise<Aranzhmani[]> {
    try {
        const { data } = await api.get<Aranzhmani[]>('/aranzhmanet');
        return data;
    } catch (err: any) {
        console.error('fetchAranzhmanet error:', err.response?.data || err.message);
        throw err;
    }
}

export async function addAranzhmani(payload: Partial<Aranzhmani>): Promise<void> {
    try {
        await api.post('/add-Aranzhmani', payload);
    } catch (err: any) {
        console.error('addAranzhmani error:', err.response?.data || err.message);
        throw err;
    }
}

export async function updateAranzhmani(id: string, payload: Partial<Aranzhmani>): Promise<Aranzhmani> {
    try {
        const { data } = await api.put<Aranzhmani>(`/Aranzhmani-update/${id}`, payload);
        return data;
    } catch (err: any) {
        console.error('updateAranzhmani error:', err.response?.data || err.message);
        throw err;
    }
}

export async function deleteAranzhmani(id: string): Promise<void> {
    try {
        await api.delete(`/Aranzhmani-delete/${id}`);
    } catch (err: any) {
        console.error('deleteAranzhmani error:', err.response?.data || err.message);
        throw err;
    }
}
