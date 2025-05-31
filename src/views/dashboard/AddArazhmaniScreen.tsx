import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Alert,
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
        axios.get('http://10.116.10.241:5000/api/shtetet')
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

    const validateForm = () => {
        if (!form.titulli.trim()) {
            Alert.alert('Gabim', 'Ju lutem shkruani titullin');
            return false;
        }
        if (!form.shtetiId) {
            Alert.alert('Gabim', 'Ju lutem zgjidhni shtetin');
            return false;
        }
        if (!form.airportId) {
            Alert.alert('Gabim', 'Ju lutem zgjidhni aeroportin');
            return false;
        }
        return true;
    };

    const onSubmit = () => {
        if (!validateForm()) return;
        
        const sanitized = {
            ...form,
            cmimi: form.cmimi === '' ? undefined : form.cmimi?.toString(),
            nrPersonave: form.nrPersonave === '' ? undefined : form.nrPersonave?.toString(),
            nrNeteve: form.nrNeteve === '' ? undefined : form.nrNeteve?.toString(),
            rating: form.rating === '' ? undefined : form.rating?.toString()
        };
        create(sanitized);
    };

    const renderInputField = (label: string, value: string, onChangeText: (text: string) => void, placeholder: string, keyboardType: any = 'default') => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                keyboardType={keyboardType}
            />
        </View>
    );

    const renderNumericField = (label: string, key: keyof FormData, placeholder: string) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={form[key]?.toString() || ''}
                onChangeText={v => {
                    const num = Number(v);
                    setForm(f => ({
                        ...f,
                        [key]: isNaN(num) ? '' : num
                    }));
                }}
                placeholder={placeholder}
                placeholderTextColor="#999"
            />
        </View>
    );

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
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
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
                        {/* Basic Information Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>📋 Informacione Bazë</Text>
                            
                            {renderInputField(
                                "Titulli i Udhëtimit",
                                form.titulli,
                                v => setForm(f => ({ ...f, titulli: v })),
                                "Shkruani titullin e udhëtimit"
                            )}

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>🌍 Shteti</Text>
                                <DropDownPicker
                                    open={shtetOpen}
                                    value={form.shtetiId}
                                    items={shtetItems}
                                    setOpen={setShtetOpen}
                                    setValue={cb => setForm(f => ({ ...f, shtetiId: cb(f.shtetiId) }))}
                                    setItems={setShtetItems}
                                    placeholder="Zgjidh destinacionin"
                                    zIndex={1000}
                                    zIndexInverse={3000}
                                    style={styles.dropdown}
                                    dropDownContainerStyle={styles.dropdownContainer}
                                    textStyle={styles.dropdownText}
                                    placeholderStyle={styles.dropdownPlaceholder}
                                    listMode="MODAL"
                                    searchable={true}
                                    searchPlaceholder="Kërko shtetin..."
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>✈️ Aeroporti</Text>
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
                                    searchable={true}
                                    searchPlaceholder="Kërko aeroportin..."
                                />
                            </View>
                        </View>

                        {/* Pricing & Details Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>💰 Detajet e Çmimit</Text>
                            
                            <View style={styles.row}>
                                {renderNumericField("Cmimi (EUR)", "cmimi", "0.00")}
                                {renderNumericField("Rating ⭐", "rating", "1-5")}
                            </View>

                            <View style={styles.row}>
                                {renderNumericField("Nr. Personave", "nrPersonave", "1")}
                                {renderNumericField("Nr. Neteve", "nrNeteve", "1")}
                            </View>
                        </View>

                        {/* Accommodation Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>🏨 Akomodimi</Text>
                            
                            {renderInputField(
                                "Lloji i Dhomës",
                                form.llojiDhomes,
                                v => setForm(f => ({ ...f, llojiDhomes: v })),
                                "p.sh. Dhomë dopio, Suite, Single"
                            )}

                            {renderInputField(
                                "Shërbimi",
                                form.sherbimi,
                                v => setForm(f => ({ ...f, sherbimi: v })),
                                "p.sh. All-Inclusive, Half Board"
                            )}
                        </View>

                        {/* Travel Dates Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>📅 Datat e Udhëtimit</Text>
                            
                            {renderInputField(
                                "Data e Nisjes",
                                form.dataNisjes,
                                v => setForm(f => ({ ...f, dataNisjes: v })),
                                "YYYY-MM-DD"
                            )}

                            {renderInputField(
                                "Data e Kthimit",
                                form.dataKthimit,
                                v => setForm(f => ({ ...f, dataKthimit: v })),
                                "YYYY-MM-DD"
                            )}
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                            <Text style={styles.submitButtonText}>🚀 Shto Aranzhmani</Text>
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
    section: {
        marginBottom: 24,
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
        backgroundColor: '#4CAF50',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});