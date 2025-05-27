// src/components/BullgariImageCard.tsx
import React from "react";
import { Image, Text, View } from "react-native";
import { BullgariImage } from "../models/BulgariImage";

export default function BullgariImageCard({ image }: { image: BullgariImage }) {
    return (
        <View style={{ alignItems: "center", padding: 20 }}>
            <Image
                source={{ uri: image.dataUri }}
                style={{ width: 300, height: 200, borderRadius: 10 }}
                resizeMode="cover"
            />
            <Text style={{ marginTop: 10, fontSize: 18 }}>{image.title}</Text>
        </View>
    );
}
