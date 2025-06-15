import { useState } from "react";
import * as Auth from "../services/AuthService";
import { User } from "../services/AuthService";

// ✅ Fix for stricter typing
type RegisterInput = Required<Pick<
    User,
    "firstName" | "lastName" | "number" | "email" | "username"
>> & {
    password: string;
};

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

    const register = async (userData: RegisterInput): Promise<void> => {
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

    const requestReset = async (email: string): Promise<string> => {
        setLoading(true);
        setError(null);
        try {
            const token = await Auth.requestPasswordReset(email);
            return token;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (
        token: string,
        newPassword: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await Auth.resetPassword(token, newPassword);
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        register,
        requestReset,
        resetPassword,
        loading,
        error,
    };
}
