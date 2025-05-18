import { useState } from 'react';
import * as Auth from '../services/AuthService';
import { User } from '../services/AuthService';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string): Promise<User> => {
        setLoading(true);
        setError(null);
        try {
            const user = await Auth.login(username, password);
            return user;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
