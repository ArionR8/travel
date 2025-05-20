import React from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useShtete } from '../../viewmodels/useShteti';

export default function ManageShteteScreen() {
    const { items, loading, error, modify, remove } = useShtete();
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [editValue, setEditValue] = React.useState('');

    if (loading) return <Text>Loading…</Text>;
    if (error) return <Text style={styles.error}>{error}</Text>;

    const confirmDelete = (id: string) =>
        Alert.alert('Konfirmo', 'Doni të fshini këtë shtet?', [
            { text: 'Anulo', style: 'cancel' },
            { text: 'Fshi', style: 'destructive', onPress: () => remove(id) },
        ]);

    const startEdit = (id: string, emri: string) => {
        setEditingId(id);
        setEditValue(emri);
    };

    const saveEdit = (id: string) => {
        if (!editValue.trim()) return;
        modify(id, { emri: editValue });
        setEditingId(null);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        {editingId === item.id ? (
                            <TextInput
                                style={styles.inputEdit}
                                value={editValue}
                                onChangeText={setEditValue}
                                onBlur={() => saveEdit(item.id)}
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.text}>{item.emri}</Text>
                        )}

                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={[styles.btn, styles.updateBtn]}
                                onPress={() =>
                                    editingId === item.id
                                        ? saveEdit(item.id)
                                        : startEdit(item.id, item.emri)
                                }
                            >
                                <Text style={styles.btnText}>Përditëso</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, styles.deleteBtn]}
                                onPress={() => confirmDelete(item.id)}
                            >
                                <Text style={styles.btnText}>Fshi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 6,
    },
    text: { flex: 1, fontSize: 16 },
    inputEdit: {
        flex: 1,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#888',
        paddingVertical: 4,
    },
    buttons: { flexDirection: 'row' },
    btn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginLeft: 8,
    },
    updateBtn: { backgroundColor: '#2563eb' },
    deleteBtn: { backgroundColor: '#dc2626' },
    btnText: { color: '#fff', fontWeight: '600' },
    error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
