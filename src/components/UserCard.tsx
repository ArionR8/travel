import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    name: string;
    email: string;
}

export const UserCard = ({ name, email }: Props) => (
    <View style={{ padding: 10, marginBottom: 10, backgroundColor: '#f0f0f0' }}>
        <Text>{name}</Text>
        <Text>{email}</Text>
    </View>
);
