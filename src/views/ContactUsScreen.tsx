// src/screens/ContactUsFormScreen.tsx
import React from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useContactViewModel } from "../viewmodels/useContactUs";

export default function ContactUsFormScreen() {
    const { formData, loading, statusMessage, setField, submit } = useContactViewModel();

    const onSubmit = async () => {
        const success = await submit();
        if (!success) {
            Alert.alert("Gabim", statusMessage);
        } else {
            Alert.alert("Sukses", statusMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kontaktoni me Ne</Text>

            <Text style={styles.label}>Emri juaj</Text>
            <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setField("name", text)}
            />

            <Text style={styles.label}>Numri juaj</Text>
            <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={formData.number}
                onChangeText={(text) => setField("number", text)}
            />

            <Text style={styles.label}>Emaili juaj</Text>
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setField("email", text)}
            />

            <Text style={styles.label}>Mesazhi</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={4}
                value={formData.message}
                onChangeText={(text) => setField("message", text)}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#4f46e5" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Dërgo</Text>
                </TouchableOpacity>
            )}

            {statusMessage ? (
                <Text style={styles.statusMessage}>{statusMessage}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontWeight: "600",
        fontSize: 16,
        color: "#111",   // Darker label color
        marginBottom: 6,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        fontSize: 16,
        color: "#000",   // Make typed text darker too
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#4f46e5",
        paddingVertical: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    statusMessage: {
        marginTop: 20,
        fontSize: 16,
        textAlign: "center",
        color: "#333",
    },
});
