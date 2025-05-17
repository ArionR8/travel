import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    dropdownOpen: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
};

export default function NavDropdown({ dropdownOpen, toggleDropdown, closeDropdown }: Props) {
    const router = useRouter();

    const goToGreqi = () => {
        closeDropdown();
        router.push('../../app/greqi/index'); // rruga relative ndaj /app
    };

    return (
        <View>
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                <Text style={styles.dropdownButtonText}>Destinations ▼</Text>
            </TouchableOpacity>

            {dropdownOpen && (
                <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={goToGreqi}>
                        <Text style={styles.dropdownItemText}>Greqi</Text>
                    </TouchableOpacity>
                    {/* Shto opsione tjera këtu */}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    dropdownButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    dropdown: {
        marginTop: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingVertical: 10,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#1e90ff',
    },
});
