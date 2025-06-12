import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DashboardNavBoard from '../../components/dashboard/NavBoard';
import { RootStackParamList } from '../../navigation/types';
import { useDubaiPrices } from '../../viewmodels/useDubaiPrice';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type Props = { navigation: NavigationProp };

export default function DubaiPriceForm({ navigation }: Props) {
    const {
        prices,
        loading,
        error,
        message,
        addPrice,
        updatePrice,
        deletePrice,
    } = useDubaiPrices();

    const [nisja, setNisja] = useState('');
    const [tipiDhomes, setTipiDhomes] = useState('');
    const [udhetimi, setUdhetimi] = useState('');
    const [cmimi, setCmimi] = useState('');
    const [sherbimi, setSherbimi] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    const clearForm = () => {
        setNisja('');
        setTipiDhomes('');
        setUdhetimi('');
        setCmimi('');
        setSherbimi('');
        setEditingId(null);
    };

    const handleAddOrUpdate = async () => {
        if (!nisja || !tipiDhomes || !udhetimi || !cmimi || !sherbimi) {
            Alert.alert('Validation', 'All fields are required.');
            return;
        }

        const payload = {
            nisja,
            tipi_dhomes: tipiDhomes,
            udhetimi: Number(udhetimi),
            cmimi: Number(cmimi),
            sherbimi,
        };

        try {
            if (editingId) {
                await updatePrice(editingId, payload);
            } else {
                await addPrice(payload);
            }
            clearForm();
        } catch (err) {
            Alert.alert('Error', 'Failed to save price.');
        }
    };

    const confirmDelete = (id: string) => {
        Alert.alert('Delete Price', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => deletePrice(id) },
        ]);
    };

    const promptUpdate = (item: typeof prices[0]) => {
        setEditingId(item.id);
        setNisja(item.nisja);
        setTipiDhomes(item.tipi_dhomes);
        setUdhetimi(String(item.udhetimi));
        setCmimi(String(item.cmimi));
        setSherbimi(item.sherbimi);
    };

    const renderRow = ({ item }: { item: typeof prices[0] }) => (
        <View style={styles.row}>
            <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.nisja} - {item.tipi_dhomes}</Text>
                <Text style={{ fontSize: 12 }}>
                    Udhetimi: {item.udhetimi} ditë | Cmimi: {item.cmimi}€ | Sherbimi: {item.sherbimi}
                </Text>
            </View>
            <TouchableOpacity onPress={() => promptUpdate(item)}>
                <Text style={styles.action}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Text style={[styles.action, { color: '#c00' }]}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <DashboardNavBoard navigation={navigation} />

            <View style={styles.form}>
                <Text style={styles.heading}>{editingId ? 'Edit Price' : 'Add Price'}</Text>
                {message ? <Text style={styles.message}>{message}</Text> : null}
                {error ? <Text style={[styles.message, { color: '#c00' }]}>{error}</Text> : null}

                <Text style={styles.label}>Nisja</Text>
                <TextInput
                    placeholder="Nisja"
                    style={styles.input}
                    value={nisja}
                    onChangeText={setNisja}
                />

                <Text style={styles.label}>Tipi i dhomës</Text>
                <TextInput
                    placeholder="Tipi i dhomës"
                    style={styles.input}
                    value={tipiDhomes}
                    onChangeText={setTipiDhomes}
                />

                <Text style={styles.label}>Udhetimi (ditë)</Text>
                <TextInput
                    placeholder="Udhetimi (ditë)"
                    style={styles.input}
                    keyboardType="numeric"
                    value={udhetimi}
                    onChangeText={setUdhetimi}
                />

                <Text style={styles.label}>Çmimi (€)</Text>
                <TextInput
                    placeholder="Çmimi (€)"
                    style={styles.input}
                    keyboardType="numeric"
                    value={cmimi}
                    onChangeText={setCmimi}
                />

                <Text style={styles.label}>Shërbimi</Text>
                <TextInput
                    placeholder="Shërbimi"
                    style={styles.input}
                    value={sherbimi}
                    onChangeText={setSherbimi}
                />

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.6 }]}
                    onPress={handleAddOrUpdate}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Saving…' : editingId ? 'Update Price' : 'Add Price'}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={prices}
                keyExtractor={(item) => item.id}
                renderItem={renderRow}
                ListEmptyComponent={() => (
                    <Text style={{ padding: 20, textAlign: 'center' }}>
                        {loading ? 'Loading…' : 'No prices yet.'}
                    </Text>
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    message: { marginBottom: 8 },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#2980b9',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    rowTitle: { fontSize: 16, fontWeight: '500' },
    action: { fontSize: 20, marginHorizontal: 8 },
});
