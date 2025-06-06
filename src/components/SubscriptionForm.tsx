// components/SubscriptionForm.tsx

import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { subscribeEmail } from '../services/SubscriptionService';

export default function SubscriptionForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async () => {
        if (!email.trim()) {
            Alert.alert('Ju lutem shkruani email');
            return;
        }
        try {
            await subscribeEmail(email);
            setMessage('Jeni abonuar me sukses! Në email do të njoftoheni për ofertat më të mira.');
            setEmail('');
        } catch (error) {
            setMessage('Ndodhi një gabim. Ju lutem provoni përsëri.');
        }
    };

    return (
        <View style={styles.subscriptionContainer}>
            <Text style={styles.subscriptionText}>
                Regjistrohu tani! Ne do të dërgojmë ofertat më të mira çdo javë.
            </Text>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
                    <Text style={styles.subscribeButtonText}>Abonohu</Text>
                </TouchableOpacity>
            </View>
            {!!message && <Text style={styles.messageText}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    subscriptionContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    subscriptionText: {
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 10,
    },
    subscribeButton: {
        backgroundColor: '#ff7a00',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    subscribeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    messageText: {
        marginTop: 12,
        color: 'green',
        textAlign: 'center',
    },
});
