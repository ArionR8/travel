import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { height } = Dimensions.get('window');

type Log = {
    id: string | number;
    action: string;
    details: string;
    createdAt: string;
};

type LogsListProps = {
    logs: Log[];
    loading: boolean;
    error: string | null;
};

export default function LogsList({ logs, loading, error }: LogsListProps) {
    const renderItem = ({ item }: { item: Log }) => (
        <View style={styles.logItem}>
            <Text style={styles.logText}>
                🧾 <Text style={styles.bold}>{item.action}</Text> — {item.details}
            </Text>
            <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
    );

    return (
        <View style={styles.logContainer}>
            <Text style={styles.sectionTitle}>Latest Logs</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <View style={{ maxHeight: height * 0.45 }}>
                    <FlatList
                        data={logs}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={true}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    logContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    logItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    logText: {
        fontSize: 14,
        color: '#333',
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    bold: {
        fontWeight: '600',
    },
});
