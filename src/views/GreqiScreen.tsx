// src/screens/GreqiScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import GreqiImageCard from '../components/GreqiImageCard';
import NavBoard from '../components/NavBoard';
import { RootStackParamList } from '../navigation/types';
import { useGreqi } from '../viewmodels/useGreqi';

const { width } = Dimensions.get('window');

type GreqiScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Greqi'>;
};

export default function GreqiScreen({ navigation }: GreqiScreenProps) {
    const {
        images,
        //hotels,
        imagesLoading,
        hotelsLoading,
        imagesError,
        hotelsError,
    } = useGreqi();

    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const loading = imagesLoading || hotelsLoading;
    const error = imagesError || hotelsError;

    useEffect(() => {
        if (images.length === 0) return;

        const intervalId = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= images.length) {
                nextIndex = 0;
            }
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentIndex, images.length]);

    if (loading) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Fixed NavBoard */}
            <View style={styles.navbarWrapper}>
                <NavBoard navigation={navigation} />
            </View>

            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollWrapper}>
                {/* Title */}
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Visit Greece</Text>
                </View>

                {/* Image Carousel */}
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
                    style={styles.flatList}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                {/* Hotel Cards 
                <View style={styles.hotelsWrapper}>
                    <Text style={styles.subTitle}>Top Hotels in Greece</Text>
                    {hotels.map((hotel) => (
                        <GreqiHotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </View>*/}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
    },
    navbarWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 60,
        zIndex: 100,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollWrapper: {
        paddingBottom: 40,
    },
    titleWrapper: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
    },
    flatList: {
        flexGrow: 0,
    },
    hotelsWrapper: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    subTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});
