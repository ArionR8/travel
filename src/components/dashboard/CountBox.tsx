import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type CountBoxesProps = {
    userCount: number | null;
    loadingUser: boolean;
    errorUser: string | null;
    aranzhmaniCount: number | null;
    loadingAranzhmani: boolean;
    errorAranzhmani: string | null;
};

export default function CountBoxes({
    userCount,
    loadingUser,
    errorUser,
    aranzhmaniCount,
    loadingAranzhmani,
    errorAranzhmani,
}: CountBoxesProps) {
    return (
        <View style={styles.countRow}>
            {/* User Count Box */}
            <View style={styles.countContainer}>
                <Text style={styles.countTitle}>Total Registered Users</Text>
                {loadingUser ? (
                    <ActivityIndicator size="small" color="#007bff" />
                ) : errorUser ? (
                    <Text style={styles.errorText}>{errorUser}</Text>
                ) : (
                    <View style={styles.countBox}>
                        <Text style={styles.countNumber}>{userCount ?? 0}</Text>
                    </View>
                )}
            </View>

            {/* Aranzhmani Count Box */}
            <View style={styles.countContainer}>
                <Text style={styles.countTitle}>Total Aranzhmanet</Text>
                {loadingAranzhmani ? (
                    <ActivityIndicator size="small" color="#28a745" />
                ) : errorAranzhmani ? (
                    <Text style={styles.errorText}>{errorAranzhmani}</Text>
                ) : (
                    <View style={[styles.countBox, styles.aranzhmaniBox]}>
                        <Text style={styles.countNumber}>{aranzhmaniCount ?? 0}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    countRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 16,
        marginBottom: 15,
    },
    countContainer: {
        backgroundColor: '#e6f0ff',
        flex: 1,
        marginHorizontal: 8,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#007bff',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    countTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#003366',
        marginBottom: 8,
        textAlign: 'center',
    },
    countBox: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 50,
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#007bff',
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6,
    },
    aranzhmaniBox: {
        backgroundColor: '#28a745',
        shadowColor: '#28a745',
    },
    countNumber: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
