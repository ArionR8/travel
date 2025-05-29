import { useEffect, useState } from "react";
import * as Auth from "../services/AuthService";
import { User } from "../services/AuthService";

export function useUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        Auth.getCurrentUser()
            .then((u) => setUser(u))
            .catch(() => setUser(null));
    }, []);

    const logout = async () => {
        await Auth.logout();
        setUser(null);
    };

    const refresh = async () => {
        const u = await Auth.getCurrentUser();
        setUser(u);
    };

    return { user, logout, refresh };
}
