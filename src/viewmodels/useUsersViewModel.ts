import { useEffect, useState } from 'react';
import { getUsers } from '../models/userService';
import { User } from '../types/User';

export const useUsersViewModel = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers()
            .then(setUsers)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { users, loading };
};
