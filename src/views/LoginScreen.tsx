import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { useAuth } from '../viewmodels/useAuth';
import { useUser } from '../viewmodels/useUser';

export default function LoginScreen() {
    const { login, loading, error } = useAuth();
    const { refresh } = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        try {
            await login(username, password);
            await refresh();
            Alert.alert('Logged in successfully');
        } catch {
            Alert.alert('Error', error || 'Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title={loading ? '…' : 'Login'} onPress={onSubmit} disabled={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
    input: { height: 48, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 12, paddingHorizontal: 10 },
});
