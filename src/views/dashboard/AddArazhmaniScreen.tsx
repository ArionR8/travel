import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchAirportsByShteti } from '../../services/AeroportiService';
import { useAranzhmani } from '../../viewmodels/useArazhmani';

interface FormData {
    titulli: string;
    shtetiId: string;
    airportId: string;
    cmimi: number | '';
    nrPersonave: number | '';
    nrNeteve: number | '';
    llojiDhomes: string;
    sherbimi: string;
    dataNisjes: string;
    dataKthimit: string;
    rating: number | '';
}

export default function AddAranzhmaniScreen() {
    const { create, message, error } = useAranzhmani();

    const [form, setForm] = useState<FormData>({
        titulli: '',
        shtetiId: '',
        airportId: '',
        cmimi: '',
        nrPersonave: '',
        nrNeteve: '',
        llojiDhomes: '',
        sherbimi: '',
        dataNisjes: '',
        dataKthimit: '',
        rating: ''
    });

    const [shtetet, setShtetet] = useState<{ id: string; emri: string }[]>([]);
    const [airports, setAirports] = useState<{ id: string; emri: string; akronimi: string }[]>([]);

    const [shtetOpen, setShtetOpen] = useState(false);
    const [airportOpen, setAirportOpen] = useState(false);

    const [shtetItems, setShtetItems] = useState<{ label: string; value: string }[]>([]);
    const [airportItems, setAirportItems] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        axios.get('http://192.168.100.90:5000/api/shtetet')
            .then(res => {
                setShtetet(res.data);
                setShtetItems(res.data.map((s: any) => ({
                    label: s.emri,
                    value: s.id
                })));
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (form.shtetiId) {
            fetchAirportsByShteti(form.shtetiId)
                .then(data => {
                    setAirports(data);
                    setAirportItems(data.map(a => ({
                        label: `${a.emri} (${a.akronimi})`,
                        value: a.id
                    })));
                })
                .catch(console.error);
        } else {
            setAirports([]);
            setAirportItems([]);
            setForm(f => ({ ...f, airportId: '' }));
        }
    }, [form.shtetiId]);

    const onSubmit = () => {
        const sanitized = {
            ...form,
            cmimi: form.cmimi === '' ? undefined : form.cmimi,
            nrPersonave: form.nrPersonave === '' ? undefined : form.nrPersonave,
            nrNeteve: form.nrNeteve === '' ? undefined : form.nrNeteve,
            rating: form.rating === '' ? undefined : form.rating
        };
        create(sanitized);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <ScrollView keyboardShouldPersistTaps="handled">
                {message && <Text style={styles.success}>{message}</Text>}
                {error && <Text style={styles.error}>{error}</Text>}

                <Text style={styles.label}>Titulli</Text>
                <TextInput
                    style={styles.input}
                    value={form.titulli}
                    onChangeText={v => setForm(f => ({ ...f, titulli: v }))}
                    placeholder="Shkruani titullin"
                />

                <Text style={styles.label}>Shteti</Text>
                <DropDownPicker
                    open={shtetOpen}
                    value={form.shtetiId}
                    items={shtetItems}
                    setOpen={setShtetOpen}
                    setValue={cb => setForm(f => ({ ...f, shtetiId: cb(f.shtetiId) }))}
                    setItems={setShtetItems}
                    placeholder="Zgjidh shtetin"
                    zIndex={1000}
                    zIndexInverse={3000}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    listMode="MODAL"
                />

                <Text style={styles.label}>Aeroporti</Text>
                <DropDownPicker
                    open={airportOpen}
                    value={form.airportId}
                    items={airportItems}
                    setOpen={setAirportOpen}
                    setValue={cb => setForm(f => ({ ...f, airportId: cb(f.airportId) }))}
                    setItems={setAirportItems}
                    placeholder="Zgjidh aeroportin"
                    zIndex={900}
                    zIndexInverse={2900}
                    disabled={!form.shtetiId}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    listMode="MODAL"
                />

                {[
                    { label: 'Cmimi (EUR)', key: 'cmimi' },
                    { label: 'Nr Personave', key: 'nrPersonave' },
                    { label: 'Nr Neteve', key: 'nrNeteve' },
                    { label: 'Rating', key: 'rating' }
                ].map(({ label, key }) => (
                    <View key={key}>
                        <Text style={styles.label}>{label}</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={form[key as keyof FormData]?.toString() || ''}
                            onChangeText={v => {
                                const num = Number(v);
                                setForm(f => ({
                                    ...f,
                                    [key]: isNaN(num) ? '' : num
                                }));
                            }}
                            placeholder="Shkruaj vlerën"
                        />
                    </View>
                ))}

                <Text style={styles.label}>Lloji i Dhomës</Text>
                <TextInput
                    style={styles.input}
                    value={form.llojiDhomes}
                    onChangeText={v => setForm(f => ({ ...f, llojiDhomes: v }))}
                    placeholder="Dhomë dopio"
                />

                <Text style={styles.label}>Sherbimi</Text>
                <TextInput
                    style={styles.input}
                    value={form.sherbimi}
                    onChangeText={v => setForm(f => ({ ...f, sherbimi: v }))}
                    placeholder="P.sh. All-Inclusive"
                />

                <Text style={styles.label}>Data e Nisjes</Text>
                <TextInput
                    style={styles.input}
                    value={form.dataNisjes}
                    onChangeText={v => setForm(f => ({ ...f, dataNisjes: v }))}
                    placeholder="YYYY-MM-DD"
                />

                <Text style={styles.label}>Data e Kthimit</Text>
                <TextInput
                    style={styles.input}
                    value={form.dataKthimit}
                    onChangeText={v => setForm(f => ({ ...f, dataKthimit: v }))}
                    placeholder="YYYY-MM-DD"
                />

                <Button title="Shto Aranzhmani" onPress={onSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 6
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    success: {
        color: 'green',
        marginBottom: 10
    },
    error: {
        color: 'red',
        marginBottom: 10
    },
    dropdown: {
        marginBottom: 10
    },
    dropdownContainer: {
        marginBottom: 15
    }
});
