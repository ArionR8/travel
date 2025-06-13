import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useGreqiHotels } from "../../viewmodels/useGreqiHotel";

export default function GreqiHotelManager() {
    const {
        hotels,
        loading: hotelsLoading,
        error: hotelsError,
        message: hotelsMessage,
        addHotel,
        deleteHotel,
        updateHotel,
        reloadHotels,
    } = useGreqiHotels();

    const [form, setForm] = useState({
        id: "",
        name: "",
        location: "",
        price: "",
        imageBase64: "",
    });

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleAddOrUpdate = () => {
        const { id, name, location, price, imageBase64 } = form;
        const priceNum = parseFloat(price);

        if (!name || !location || !price || !imageBase64) {
            Alert.alert("Please fill all fields");
            return;
        }

        if (id) {
            updateHotel(id, name, location, priceNum, imageBase64);
        } else {
            addHotel(name, location, priceNum, imageBase64);
        }

        setForm({ id: "", name: "", location: "", price: "", imageBase64: "" });
    };

    const handleEdit = (hotel: any) => {
        setForm({
            id: hotel.id,
            name: hotel.name,
            location: hotel.location,
            price: hotel.price.toString(),
            imageBase64: hotel.imageBase64,
        });
    };

    const handleDelete = (id: string) => {
        Alert.alert("Confirm", "Delete this hotel?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteHotel(id) },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Greqi Hotel Manager</Text>

            {hotelsError && <Text style={styles.error}>{hotelsError}</Text>}
            {hotelsMessage && <Text style={styles.success}>{hotelsMessage}</Text>}

            <TextInput
                placeholder="Name"
                value={form.name}
                onChangeText={(val) => handleChange("name", val)}
                style={styles.input}
            />
            <TextInput
                placeholder="Location"
                value={form.location}
                onChangeText={(val) => handleChange("location", val)}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={form.price}
                keyboardType="numeric"
                onChangeText={(val) => handleChange("price", val)}
                style={styles.input}
            />
            <TextInput
                placeholder="Image Base64"
                value={form.imageBase64}
                onChangeText={(val) => handleChange("imageBase64", val)}
                style={styles.input}
            />

            <TouchableOpacity onPress={handleAddOrUpdate} style={styles.button}>
                <Text style={styles.buttonText}>
                    {form.id ? "Update Hotel" : "Add Hotel"}
                </Text>
            </TouchableOpacity>

            {hotelsLoading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={hotels}
                    keyExtractor={(item) => item.id}
                    style={{ marginTop: 20 }}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.hotelText}>{item.name}</Text>
                            <Text style={styles.hotelText}>📍 {item.location}</Text>
                            <Text style={styles.hotelText}>💰 {item.price}€</Text>

                            <View style={styles.actions}>
                                <TouchableOpacity
                                    onPress={() => handleEdit(item)}
                                    style={[styles.actionBtn, { backgroundColor: "#3498db" }]}
                                >
                                    <Text style={styles.actionText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id)}
                                    style={[styles.actionBtn, { backgroundColor: "#e74c3c" }]}
                                >
                                    <Text style={styles.actionText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: "#2ecc71",
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "bold" },
    card: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    hotelText: { fontSize: 16 },
    actions: {
        flexDirection: "row",
        marginTop: 10,
        gap: 10,
    },
    actionBtn: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    actionText: { color: "#fff", fontWeight: "bold" },
    error: { color: "red", marginTop: 10 },
    success: { color: "green", marginTop: 10 },
});
