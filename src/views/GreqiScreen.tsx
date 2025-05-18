// src/screens/GreqiScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Text, View } from 'react-native';
import GreqiImageCard from '../components/GreqiImageCard';
import { useGreqiImages } from '../viewmodels/useGreqiImages';

const { width } = Dimensions.get('window');

export default function GreqiScreen() {
    const { images, loading, error } = useGreqiImages();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;

        const intervalId = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= images.length) {
                nextIndex = 0;
            }
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 3000); // every 3 seconds

        return () => clearInterval(intervalId);
    }, [currentIndex, images.length]);

    if (loading) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={(img) => img.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={{ width }}>
                    <GreqiImageCard image={item} />
                </View>
            )}
            getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
            })}
            onScrollToIndexFailed={() => { }}
        />
    );
}
