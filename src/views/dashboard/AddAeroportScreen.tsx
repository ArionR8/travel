import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchShtetet } from '../../services/ShtetiService';
import { useAirport } from '../../viewmodels/useAeroport';

// Add navigation imports
import { StackNavigationProp } from '@react-navigation/stack';
import DashboardNavBoard from '../../components/dashboard/NavBoard';
import { RootStackParamList } from '../../navigation/types';

interface FormData {
    emri: string;
    akronimi: string;
    shtetiId: string;
}

// Add navigation props type
type AddAirportScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'AddAirport'>;
};

export default function AddAirportScreen({ navigation }: AddAirportScreenProps) {
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
            Alert.alert('Kujdes', 'Ju lutem plotësoni të gjitha fushat!', [
                { text: 'OK', style: 'default' }
            ]);
            return;
        }

        create(form);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Add Dashboard Navigation Board */}
            <DashboardNavBoard navigation={navigation} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header - Reduced top padding to account for nav board */}
                    <View style={[styles.header, { marginTop: 10 }]}>
                        <Text style={styles.title}>Regjistro Aeroport të Ri</Text>
                        <Text style={styles.subtitle}>Plotëso të dhënat për aeroportin</Text>
                    </View>

                    {/* Messages */}
                    {message && (
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageSuccess}>✅ {message}</Text>
                        </View>
                    )}
                    {error && (
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageError}>❌ {error}</Text>
                        </View>
                    )}

                    {/* Form */}
                    <View style={styles.formContainer}>
                        {/* Airport Name Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Emri i Aeroportit</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        form.emri ? styles.inputFocused : null
                                    ]}
                                    value={form.emri}
                                    onChangeText={(v) => setForm((f) => ({ ...f, emri: v }))}
                                    placeholder="Shkruani emrin e aeroportit"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        {/* Acronym Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Akronimi</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        form.akronimi ? styles.inputFocused : null
                                    ]}
                                    value={form.akronimi}
                                    onChangeText={(v) => setForm((f) => ({ ...f, akronimi: v.toUpperCase() }))}
                                    placeholder="Shembull: TIA"
                                    placeholderTextColor="#9CA3AF"
                                    maxLength={3}
                                    autoCapitalize="characters"
                                />
                            </View>
                            <Text style={styles.helperText}>Maksimumi 3 shkronja</Text>
                        </View>

                        {/* Country Dropdown */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Zgjidh Shtetin</Text>
                            <View style={styles.dropdownWrapper}>
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
                                    textStyle={styles.dropdownText}
                                    placeholderStyle={styles.dropdownPlaceholder}
                                    zIndex={1000}
                                    zIndexInverse={3000}
                                    listMode="SCROLLVIEW"
                                    scrollViewProps={{
                                        nestedScrollEnabled: true,
                                    }}
                                />
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={onSubmit}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.submitButtonText}>🛫 Regjistro Aeroportin</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 10, // Reduced top padding
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    messageContainer: {
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    messageSuccess: {
        color: '#059669',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    messageError: {
        color: '#DC2626',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 8,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
    },
    inputFocused: {
        borderColor: '#3B82F6',
        backgroundColor: '#F8FAFC',
    },
    helperText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
        marginLeft: 4,
    },
    dropdownWrapper: {
        zIndex: 1000,
    },
    dropdown: {
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        minHeight: 50,
    },
    dropdownContainer: {
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        maxHeight: 200,
    },
    dropdownText: {
        fontSize: 16,
        color: '#1F2937',
    },
    dropdownPlaceholder: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    submitButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        shadowColor: '#3B82F6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});