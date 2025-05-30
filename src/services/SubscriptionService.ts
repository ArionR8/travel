import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

export async function subscribeEmail(email: string): Promise<void> {
    if (!email.trim()) throw new Error('Email is required');

    try {
        await api.post('/abonohu', { email });
    } catch (error: any) {
        console.error('subscribeEmail error:', error.response?.data || error.message);
        throw new Error('Subscription failed');
    }
}
