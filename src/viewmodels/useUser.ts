// /src/viewmodels/useUser.ts

import { useEffect, useState } from "react";
import * as Auth from "../services/AuthService";
import { User } from "../services/AuthService";

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [userCount, setUserCount] = useState<number | null>(null);
    const [loadingCount, setLoadingCount] = useState<boolean>(true);
    const [errorCount, setErrorCount] = useState<string | null>(null);

    useEffect(() => {
        fetchCurrentUser();
        fetchUserCount();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const u = await Auth.getCurrentUser();
            setUser(u);
        } catch {
            setUser(null);
        }
    };

    const fetchUserCount = async () => {
        try {
            setLoadingCount(true);
            const count = await Auth.getUserCount();
            setUserCount(count);
            setErrorCount(null);
        } catch (error: any) {
            setErrorCount(error.message || "Error fetching user count");
        } finally {
            setLoadingCount(false);
        }
    };

    const logout = async () => {
        await Auth.logout();
        setUser(null);
    };

    const refresh = async () => {
        await fetchCurrentUser();
        await fetchUserCount();
    };

    return {
        user,
        logout,
        refresh,
        userCount,
        loadingCount,
        errorCount,
        refetchUserCount: fetchUserCount,
    };
}
