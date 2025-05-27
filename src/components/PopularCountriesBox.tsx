import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

// Import your country images here:
import {
    AlbaniaImage,
    DubaiImage,
    GreqiImage,
    NewYorkImage,
} from '../../assets/images';

const { height } = Dimensions.get('window');
const NAVBAR_HEIGHT = 250;

const COUNTRIES = [
    { id: '1', title: 'Shqipëri', image: AlbaniaImage },
    { id: '2', title: 'Dubai', image: DubaiImage },
    { id: '3', title: 'Greqi', image: GreqiImage },
    { id: '4', title: 'New York', image: NewYorkImage },
    // Add more countries as needed
];

export default function PopularCountriesBox() {
    const containerHeight = height - NAVBAR_HEIGHT;

    const renderItem = ({ item }: { item: { id: string; title: string; image: any } }) => (
        <View style={[styles.countryBox, { height: containerHeight }]}>
            <Image source={item.image} style={styles.countryImage} resizeMode="cover" />
            <View style={styles.overlayTitleContainer}>
                <Text style={styles.overlayTitleText}>{item.title}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { height: containerHeight }]}>
            <Text style={styles.title}>Vendet e Njohura</Text>
            <FlatList
                data={COUNTRIES}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        // Heqim backgroundColor për container, të jetë transparent
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingRight: 20,
        alignItems: 'center',
    },
    countryBox: {
        width: 300,
        borderRadius: 12,
        marginRight: 15,
        shadowColor: '#b91c1c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,

        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',  // për qendrimin vertikal të tekstit
        alignItems: 'center',      // për qendrimin horizontal të tekstit
        backgroundColor: 'transparent', // heq sfond të kuq
    },
    countryImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    overlayTitleContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    overlayTitleText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
    },
});
