// views/dashboard/ManageAranzhmaniScreen.tsx
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Modal from '../../components/Modal';
import { useAranzhmani } from '../../viewmodels/useArazhmani';

export default function ManageAranzhmaniScreen() {
    const { items, loading, error, remove, modify } = useAranzhmani();

    if (loading) return <Text>Loading…</Text>;
    if (error) return <Text style={{ color: 'red' }}>{error}</Text>;

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={items}
                keyExtractor={i => i.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', padding: 8 }}>
                        <Text style={{ flex: 1 }}>{item.titulli}</Text>
                        <TouchableOpacity onPress={() => modify(item.id, { titulli: item.titulli + ' ✏️' })}>
                            <Text>✏️</Text>
                        </TouchableOpacity>
                        <Modal onConfirm={() => remove(item.id)}>
                            <Text>🗑️</Text>
                        </Modal>
                    </View>
                )}
            />
        </View>
    );
}