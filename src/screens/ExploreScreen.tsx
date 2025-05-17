import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ExploreScreen() {
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setSelectedSection(prev => (prev === section ? null : section));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Explore Travel Options</Text>

            {/* Aranzhime Button */}
            <TouchableOpacity onPress={() => toggleSection('aranzhime')} style={styles.button}>
                <Text style={styles.buttonText}>Aranzhime</Text>
            </TouchableOpacity>
            {selectedSection === 'aranzhime' && (
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Destinacioni" style={styles.input} />
                    <TextInput placeholder="Data e nisjes" style={styles.input} />
                    <TextInput placeholder="Numri i netëve" style={styles.input} />
                </View>
            )}

            {/* Fluturime Button */}
            <TouchableOpacity onPress={() => toggleSection('fluturime')} style={styles.button}>
                <Text style={styles.buttonText}>Fluturime</Text>
            </TouchableOpacity>
            {selectedSection === 'fluturime' && (
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Prej" style={styles.input} />
                    <TextInput placeholder="Deri" style={styles.input} />
                    <TextInput placeholder="Data e udhëtimit" style={styles.input} />
                </View>
            )}

            {/* Hotele Button */}
            <TouchableOpacity onPress={() => toggleSection('hotele')} style={styles.button}>
                <Text style={styles.buttonText}>Hotele</Text>
            </TouchableOpacity>
            {selectedSection === 'hotele' && (
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Qyteti" style={styles.input} />
                    <TextInput placeholder="Data e Check-in" style={styles.input} />
                    <TextInput placeholder="Numri i netëve" style={styles.input} />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0066cc',
        padding: 14,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    inputGroup: {
        marginTop: 10,
        marginBottom: 20,
        gap: 8,
    },
    input: {
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
});
