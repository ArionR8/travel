import React, { useEffect, useState } from 'react';
import {
    Button,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchShtetet } from '../../services/ShtetiService';
import { useAirport } from '../../viewmodels/useAeroport';

interface FormData {
    emri: string;
    akronimi: string;
    shtetiId: string; // <-- emri i saktë që pranon backend-i
}

export default function AddAirportScreen() {
    const { create, message, error } = useAirport();

    const [form, setForm] = useState<FormData>({
        emri: '',
        akronimi: '',
        shtetiId: '',
    });

    const [shtetet, setShtetet] = useState<{ id: string; emri: string }[]>([]);

    // Dropdown picker state
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        async function loadShtetet() {
            try {
                const data = await fetchShtetet();
                setShtetet(data);
                const dropdownItems = data.map((s) => ({
                    label: s.emri,
                    value: s.id,
                }));
                setItems(dropdownItems);
            } catch (e) {
                console.error('Error loading shtetet:', e);
            }
        }
        loadShtetet();
    }, []);

    useEffect(() => {
        if (value !== null) {
            setForm((f) => ({ ...f, shtetiId: value }));
        }
    }, [value]);

    const onSubmit = () => {
        if (!form.emri.trim() || !form.akronimi.trim() || !form.shtetiId) {
            alert('Ju lutem plotësoni të gjitha fushat!');
            return;
        }

        create(form); // Tani forma është e saktë me shtetiId
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            {message ? <Text style={styles.messageSuccess}>{message}</Text> : null}
            {error ? <Text style={styles.messageError}>{error}</Text> : null}

            <Text style={styles.label}>Emri i Aeroportit</Text>
            <TextInput
                style={styles.input}
                value={form.emri}
                onChangeText={(v) => setForm((f) => ({ ...f, emri: v }))}
                placeholder="Shkruani emrin"
            />

            <Text style={styles.label}>Akronimi</Text>
            <TextInput
                style={styles.input}
                value={form.akronimi}
                onChangeText={(v) => setForm((f) => ({ ...f, akronimi: v }))}
                placeholder="Shembull: TIA"
            />

            <Text style={styles.label}>Zgjidh Shtetin</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="-- Zgjidh shtetin --"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={1000}
                zIndexInverse={3000}
            />

            <View style={{ marginTop: 20 }}>
                <Button title="Regjistro Aeroportin" onPress={onSubmit} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
        marginTop: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    dropdown: {
        borderColor: '#bbb',
        borderRadius: 6,
    },
    dropdownContainer: {
        borderColor: '#bbb',
        borderRadius: 6,
    },
    messageSuccess: {
        color: 'green',
        marginBottom: 12,
    },
    messageError: {
        color: 'red',
        marginBottom: 12,
    },
});
