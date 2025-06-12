// /src/viewmodels/useAuth.ts
import { useState } from "react";
import * as Auth from "../services/AuthService";
import { User } from "../services/AuthService";

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

    const register = async (userData: {
        firstName: string;
        lastName: string;
        number: string;
        email: string;
        username: string;
        password: string;
    }): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await Auth.register(userData);
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { login, register, loading, error };
}
