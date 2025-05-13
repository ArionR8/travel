import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useUsersViewModel } from '../src/viewmodels/useUsersViewModel';
import { UserCard } from '../src/components/UserCard';

export default function UsersScreen() {
    const { users, loading } = useUsersViewModel();

    if (loading) return <ActivityIndicator size="large" />;

    return (
        <View style={{ padding: 20 }}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UserCard name={item.name} email={item.email} />
                )}
            />
        </View>
    );
}
