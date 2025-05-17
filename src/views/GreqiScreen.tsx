// src/views/GreqiScreen.tsx
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import GreqiImageCard from '../components/GreqiImageCard';
import { useGreqiImages } from '../viewmodels/useGreqiImages';

export default function GreqiScreen() {
    const { images, loading, error } = useGreqiImages();

    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    if (error) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{error.message}</Text>
        </View>
    );

    return (
        <FlatList
            data={images}
            keyExtractor={img => img.id}
            renderItem={({ item }) => <GreqiImageCard image={item} />}
            contentContainerStyle={{ padding: 12 }}
        />
    );
}
