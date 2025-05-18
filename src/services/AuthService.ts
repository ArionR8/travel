import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    number?: string;
    email: string;
    username: string;
    role?: string;
}

const STORAGE_KEY = 'current_user';

export async function login(username: string, password: string): Promise<User> {
    const res = await fetch('http://192.168.100.90:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Login failed');
    }

    const data = await res.json();
    const user: User = data.user;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
}

export async function logout(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function getCurrentUser(): Promise<User | null> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as User;
    } catch {
        return null;
    }
}
