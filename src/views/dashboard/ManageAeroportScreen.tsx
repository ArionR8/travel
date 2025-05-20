// screens/ManageAeroportsScreen.tsx
import React from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useAirport } from '../../viewmodels/useAeroport';

export default function ManageAeroportsScreen() {
    const { items, loading, error, remove } = useAirport();

    if (loading) return <Text>Loading…</Text>;
    if (error) return <Text style={styles.error}>{error}</Text>;

    const confirmDelete = (id: string) =>
        Alert.alert('Konfirmo', 'Doni të fshini këtë aeroport?', [
            { text: 'Anulo', style: 'cancel' },
            { text: 'Fshi', style: 'destructive', onPress: () => remove(id) },
        ]);

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.emri} ({item.akronimi})</Text>
                        <TouchableOpacity
                            style={[styles.btn, styles.deleteBtn]}
                            onPress={() => confirmDelete(item.id)}
                        >
                            <Text style={styles.btnText}>Fshi</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 6,
    },
    text: { fontSize: 16 },
    btn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    deleteBtn: { backgroundColor: '#dc2626' },
    btnText: { color: '#fff', fontWeight: '600' },
    error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
