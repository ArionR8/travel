// services/AranzhmaniService.ts
import axios from 'axios';
import { Aranzhmani } from '../models/Aranzhmani';

const api = axios.create({ baseURL: 'http://192.168.100.90:5000/api', withCredentials: true });

export async function fetchAranzhmanet(): Promise<Aranzhmani[]> {
    const { data } = await api.get<Aranzhmani[]>('/aranzhmanet');
    return data;
}

export async function addAranzhmani(payload: Partial<Aranzhmani>): Promise<void> {
    await api.post('/add-Aranzhmani', payload);
}

export async function updateAranzhmani(id: string, payload: Partial<Aranzhmani>): Promise<Aranzhmani> {
    const { data } = await api.put<Aranzhmani>(`/Aranzhmani-update/${id}`, payload);
    return data;
}

export async function deleteAranzhmani(id: string): Promise<void> {
    await api.delete(`/Aranzhmani-delete/${id}`);
}