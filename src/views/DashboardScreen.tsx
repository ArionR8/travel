import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
    return (
        <View style={styles.center}>
            <Text style={styles.text}>Welcome to Dashboard</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
