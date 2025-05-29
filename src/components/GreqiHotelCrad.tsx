// src/components/GreqiHotelCard.tsx
import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { GreqiHotel } from "../models/GreqiHotel";

interface GreqiHotelCardProps {
    hotel: GreqiHotel;
}

const GreqiHotelCard: FC<GreqiHotelCardProps> = ({ hotel }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: hotel.imageBase64 }} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
                <Text style={styles.name}>{hotel.name}</Text>
                <Text style={styles.location}>{hotel.location}</Text>
                <Text style={styles.details}>
                    ⭐ {hotel.rating}  |  💰 ${hotel.price.toFixed(2)}
                </Text>
            </View>
        </View>
    );
};

export default GreqiHotelCard;

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: "100%",
        height: 200,
    },
    info: {
        padding: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1f2937",
    },
    location: {
        fontSize: 16,
        color: "#4b5563",
        marginTop: 4,
    },
    details: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 6,
    },
});
