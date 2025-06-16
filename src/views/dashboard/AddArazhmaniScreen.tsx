import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
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
            cmimi: form.cmimi === '' ? undefined : form.cmimi.toString(),
            nrPersonave: form.nrPersonave === '' ? undefined : form.nrPersonave.toString(),
            nrNeteve: form.nrNeteve === '' ? undefined : form.nrNeteve.toString(),
            rating: form.rating === '' ? undefined : form.rating.toString()
        };
        create(sanitized);
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Shto Aranzhmani të Ri</Text>
                <Text style={styles.headerSubtitle}>Plotësoni informacionet e udhëtimit</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {message && (
                        <View style={styles.successContainer}>
                            <Text style={styles.successText}>✅ {message}</Text>
                        </View>
                    )}
                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>❌ {error}</Text>
                        </View>
                    )}

                    <View style={styles.formCard}>
                        <Text style={styles.sectionTitle}>📋 Informacione Bazë</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Titulli</Text>
                            <TextInput
                                style={styles.input}
                                value={form.titulli}
                                onChangeText={v => setForm(f => ({ ...f, titulli: v }))}
                                placeholder="Shkruani titullin"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
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
                                textStyle={styles.dropdownText}
                                placeholderStyle={styles.dropdownPlaceholder}
                                listMode="MODAL"
                            />
                        </View>

                        <View style={styles.inputContainer}>
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
                                style={[styles.dropdown, !form.shtetiId && styles.disabledDropdown]}
                                dropDownContainerStyle={styles.dropdownContainer}
                                textStyle={styles.dropdownText}
                                placeholderStyle={styles.dropdownPlaceholder}
                                listMode="MODAL"
                            />
                        </View>

                        <Text style={styles.sectionTitle}>💰 Detajet e Çmimit</Text>

                        <View style={styles.row}>
                            <View style={[styles.inputContainer, { flex: 1 }]}>
                                <Text style={styles.label}>Cmimi (EUR)</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={form.cmimi?.toString() || ''}
                                    onChangeText={v => {
                                        const num = Number(v);
                                        setForm(f => ({
                                            ...f,
                                            cmimi: isNaN(num) ? '' : num
                                        }));
                                    }}
                                    placeholder="0.00"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={[styles.inputContainer, { flex: 1 }]}>
                                <Text style={styles.label}>Rating</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={form.rating?.toString() || ''}
                                    onChangeText={v => {
                                        const num = Number(v);
                                        setForm(f => ({
                                            ...f,
                                            rating: isNaN(num) ? '' : num
                                        }));
                                    }}
                                    placeholder="1-5"
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputContainer, { flex: 1 }]}>
                                <Text style={styles.label}>Nr Personave</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={form.nrPersonave?.toString() || ''}
                                    onChangeText={v => {
                                        const num = Number(v);
                                        setForm(f => ({
                                            ...f,
                                            nrPersonave: isNaN(num) ? '' : num
                                        }));
                                    }}
                                    placeholder="1"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={[styles.inputContainer, { flex: 1 }]}>
                                <Text style={styles.label}>Nr Neteve</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={form.nrNeteve?.toString() || ''}
                                    onChangeText={v => {
                                        const num = Number(v);
                                        setForm(f => ({
                                            ...f,
                                            nrNeteve: isNaN(num) ? '' : num
                                        }));
                                    }}
                                    placeholder="1"
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>🏨 Akomodimi</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Lloji i Dhomës</Text>
                            <TextInput
                                style={styles.input}
                                value={form.llojiDhomes}
                                onChangeText={v => setForm(f => ({ ...f, llojiDhomes: v }))}
                                placeholder="Dhomë dopio"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Sherbimi</Text>
                            <TextInput
                                style={styles.input}
                                value={form.sherbimi}
                                onChangeText={v => setForm(f => ({ ...f, sherbimi: v }))}
                                placeholder="P.sh. All-Inclusive"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <Text style={styles.sectionTitle}>📅 Datat e Udhëtimit</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Data e Nisjes</Text>
                            <TextInput
                                style={styles.input}
                                value={form.dataNisjes}
                                onChangeText={v => setForm(f => ({ ...f, dataNisjes: v }))}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Data e Kthimit</Text>
                            <TextInput
                                style={styles.input}
                                value={form.dataKthimit}
                                onChangeText={v => setForm(f => ({ ...f, dataKthimit: v }))}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                            <Text style={styles.submitButtonText}>Shto Aranzhmani</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2196F3',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#E3F2FD',
        textAlign: 'center',
        marginTop: 4,
        opacity: 0.9,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    formCard: {
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3A47',
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#E8F4FD',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2E3A47',
        marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: '#E1E8ED',
        backgroundColor: '#FAFBFC',
        padding: 14,
        borderRadius: 12,
        fontSize: 16,
        color: '#2E3A47',
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    dropdown: {
        borderWidth: 2,
        borderColor: '#E1E8ED',
        backgroundColor: '#FAFBFC',
        borderRadius: 12,
        minHeight: 50,
    },
    disabledDropdown: {
        backgroundColor: '#F0F0F0',
        borderColor: '#D0D0D0',
    },
    dropdownContainer: {
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    dropdownText: {
        fontSize: 16,
        color: '#2E3A47',
        fontWeight: '500',
    },
    dropdownPlaceholder: {
        color: '#999',
        fontSize: 16,
    },
    successContainer: {
        margin: 16,
        marginBottom: 0,
        backgroundColor: '#E8F5E8',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    successText: {
        color: '#2E7D32',
        fontSize: 16,
        fontWeight: '600',
    },
    errorContainer: {
        margin: 16,
        marginBottom: 0,
        backgroundColor: '#FFEBEE',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#F44336',
    },
    errorText: {
        color: '#C62828',
        fontSize: 16,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#2196F3',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});