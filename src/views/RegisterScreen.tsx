import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootStackParamList } from '../navigation/types'; // Adjust path as needed
import { useAuth } from '../viewmodels/useAuth';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type RegisterScreenProps = {
    navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const { register, loading, error } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.number.match(/^\+?\d{7,15}$/)) newErrors.number = 'Invalid phone number';
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email address';
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (formData.password.length < 6)
            newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async () => {
        if (!validate()) return;

        try {
            await register(formData);
            Alert.alert('✅ Success', 'Registration successful');
            navigation.navigate('Home'); // <-- Typed navigation to Home
        } catch {
            Alert.alert('❌ Error', error || 'Registration failed');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Create Account</Text>

            {(['firstName', 'lastName', 'number', 'email', 'username'] as const).map((field) => (
                <View key={field} style={styles.inputContainer}>
                    <TextInput
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        placeholderTextColor="#333"
                        value={formData[field]}
                        onChangeText={(text) => handleChange(field, text)}
                        style={[styles.input, errors[field] && styles.inputError]}
                        autoCapitalize={field === 'email' || field === 'username' ? 'none' : 'words'}
                        keyboardType={field === 'number' ? 'phone-pad' : 'default'}
                    />
                    {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
                </View>
            ))}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#333"
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry
                    style={[styles.input, errors.password && styles.inputError]}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                onPress={onSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    inputContainer: {
        marginBottom: 12,
    },
    input: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#e74c3c',
    },
    errorText: {
        marginTop: 4,
        color: '#e74c3c',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#95a5a6',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
