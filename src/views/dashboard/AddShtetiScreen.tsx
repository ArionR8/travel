import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { useShtete } from '../../viewmodels/useShteti';

type Props = {
    navigation: StackNavigationProp<RootStackParamList>;
};

export default function AddShteteScreen({ navigation }: Props) {
    const { create, message, error } = useShtete();
    const [emri, setEmri] = useState('');

    const onSubmit = () => {
        if (!emri.trim()) return;
        create({ emri });
        setEmri('');
        setTimeout(() => navigation.navigate('ManageShteti'), 1000);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!!message && <Text style={styles.success}>{message}</Text>}
            {!!error && <Text style={styles.error}>{error}</Text>}

            <Text style={styles.label}>Emri i Shtetit</Text>
            <TextInput
                style={styles.input}
                placeholder="Shkruani emrin"
                value={emri}
                onChangeText={setEmri}
            />

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Regjistro Shtetin</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f3f4f6', flexGrow: 1 },
    label: { fontSize: 16, marginBottom: 8 },
    input: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#2563eb',
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    success: { color: 'green', marginBottom: 12, textAlign: 'center' },
    error: { color: 'red', marginBottom: 12, textAlign: 'center' },
});
