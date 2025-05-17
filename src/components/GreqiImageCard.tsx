// src/components/GreqiImageCard.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GreqiImage } from '../models/GreqiImage';

export default function GreqiImageCard({ image }: { image: GreqiImage }) {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: image.dataUri }}
                style={styles.img}
                resizeMode="cover"
            />
            {image.title ? <Text style={styles.caption}>{image.title}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    card: { marginVertical: 8, borderRadius: 8, overflow: 'hidden' },
    img: { width: '100%', height: 250 },
    caption: { padding: 6, textAlign: 'center' },
});
