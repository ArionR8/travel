import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { GreqiHotel } from "../../models/GreqiHotel";
import { useGreqi } from "../../viewmodels/useGreqi";

export default function GreqiHotelManager() {
    const {
        hotels,
        hotelsLoading,
        hotelsError,
        hotelsMessage,
        addHotel,
        deleteHotel,
        updateHotel,
    } = useGreqi();

    // Form states matching the model
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState(""); // Note: rating not saved in backend
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert(
                    "Permission required",
                    "Permission to access gallery is required!"
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                quality: 0.7,
                allowsEditing: true,
            });

            if (!result.canceled && result.assets.length > 0 && result.assets[0].base64) {
                setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
            }
        } catch (err) {
            Alert.alert(
                "Image Picker Error",
                err instanceof Error ? err.message : "Unknown error"
            );
        }
    };

    const handleSubmit = async () => {
        if (
            !name.trim() ||
            !location.trim() ||
            !rating.trim() ||
            !price.trim() ||
            (!editingId && !image)
        ) {
            Alert.alert("Validation", "Please fill all fields and select an image");
            return;
        }

        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
            Alert.alert("Validation", "Rating must be a number between 0 and 5");
            return;
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            Alert.alert("Validation", "Price must be a valid number");
            return;
        }

        try {
            if (editingId) {
                // updateHotel(id, name, location, price, base64?)
                await updateHotel(editingId, name.trim(), location.trim(), parsedPrice, image || undefined);
            } else {
                // addHotel(name, location, price, base64)
                await addHotel(name.trim(), location.trim(), parsedPrice, image!);
            }

            resetForm();
        } catch (err) {
            Alert.alert("Error", err instanceof Error ? err.message : "Unknown error");
        }
    };

    const resetForm = () => {
        setName("");
        setLocation("");
        setRating("");
        setPrice("");
        setImage(null);
        setEditingId(null);
    };

    const handleEdit = (hotel: GreqiHotel) => {
        setName(hotel.name);
        setLocation(hotel.location);
        setRating(hotel.rating?.toString() ?? ""); // rating may be missing
        setPrice(hotel.price.toString());
        setImage(hotel.imageBase64 || null);
        setEditingId(hotel.id);
    };

    const confirmDelete = (id: string) => {
        Alert.alert("Delete Hotel", "Are you sure you want to delete this hotel?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteHotel(id) },
        ]);
    };

    const renderHotel = ({ item }: { item: GreqiHotel }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imageBase64 }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.hotelName}>{item.name}</Text>
                <Text style={styles.hotelDescription}>{item.location}</Text>
                <Text style={styles.hotelPrice}>Rating: {item.rating?.toFixed(1) ?? "N/A"} / 5</Text>
                <Text style={styles.hotelPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                    <Text style={[styles.actionText, { color: "#fff" }]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.heading}>{editingId ? "Edit Hotel" : "Add New Hotel"}</Text>

                {hotelsMessage ? <Text style={styles.message}>{hotelsMessage}</Text> : null}
                {hotelsError ? <Text style={[styles.message, styles.error]}>{hotelsError}</Text> : null}

                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#333"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
                <TextInput
                    placeholder="Location"
                    placeholderTextColor="#333"
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    autoCapitalize="words"
                />
                <TextInput
                    placeholder="Rating (0-5)"
                    placeholderTextColor="#333"
                    style={styles.input}
                    value={rating}
                    onChangeText={setRating}
                    keyboardType="decimal-pad"
                />
                <TextInput
                    placeholder="Price"
                    placeholderTextColor="#333"
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                />

                <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
                    <Text style={styles.pickButtonText}>Choose Image from Phone</Text>
                </TouchableOpacity>

                {image && <Image source={{ uri: image }} style={styles.preview} />}

                <TouchableOpacity
                    style={[styles.submitButton, hotelsLoading && { opacity: 0.6 }]}
                    disabled={hotelsLoading}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>
                        {hotelsLoading ? "Saving…" : editingId ? "Update Hotel" : "Add Hotel"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <FlatList
                data={hotels}
                keyExtractor={(item) => item.id}
                renderItem={renderHotel}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyList}>
                        {hotelsLoading ? "Loading hotels…" : "No hotels available."}
                    </Text>
                )}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    form: {
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    heading: { fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#333" },
    message: { marginBottom: 8, fontSize: 14, color: "#27ae60" },
    error: { color: "#c0392b" },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
        color: "#333",
    },
    pickButton: {
        backgroundColor: "#27ae60",
        padding: 14,
        borderRadius: 6,
        alignItems: "center",
        marginBottom: 15,
    },
    pickButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    preview: {
        width: "100%",
        height: 180,
        borderRadius: 6,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: "#2980b9",
        padding: 14,
        borderRadius: 6,
        alignItems: "center",
        marginBottom: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#eee",
        borderRadius: 6,
        marginHorizontal: 15,
        marginVertical: 7,
        padding: 10,
        alignItems: "center",
    },
    cardImage: {
        width: 100,
        height: 70,
        borderRadius: 6,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
    },
    hotelName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2c3e50",
    },
    hotelDescription: {
        fontSize: 14,
        color: "#34495e",
        marginVertical: 4,
    },
    hotelPrice: {
        fontSize: 14,
        color: "#27ae60",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    editButton: {
        marginRight: 10,
        padding: 6,
        backgroundColor: "#2980b9",
        borderRadius: 4,
    },
    deleteButton: {
        padding: 6,
        backgroundColor: "#c0392b",
        borderRadius: 4,
    },
    actionText: {
        color: "#fff",
        fontWeight: "600",
    },
    emptyList: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#666",
    },
});
