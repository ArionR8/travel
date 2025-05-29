import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

import {
    AlbaniaImage,
    DubaiImage,
    GreqiImage,
    NewYorkImage,
} from '../../assets/images';

const { width, height } = Dimensions.get('window');
const NAVBAR_HEIGHT = 250;

const COUNTRIES = [
    { id: '1', title: 'Shqipëri', image: AlbaniaImage },
    { id: '2', title: 'Dubai', image: DubaiImage },
    { id: '3', title: 'Greqi', image: GreqiImage },
    { id: '4', title: 'New York', image: NewYorkImage },
];

export default function PopularCountriesBox() {
    const containerHeight = height - NAVBAR_HEIGHT;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const renderItem = ({ item }: { item: { id: string; title: string; image: any } }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Greqi')}
            style={[styles.countryBox, { height: containerHeight, width }]}
        >
            <Image source={item.image} style={styles.countryImage} resizeMode="cover" />
            <View style={styles.overlayTitleContainer}>
                <Text style={styles.overlayTitleText}>{item.title}</Text>
            </View>
        </TouchableOpacity>
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
                snapToInterval={width}
                decelerationRate="fast"
                snapToAlignment="start"
                disableIntervalMomentum={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
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
        alignItems: 'center',
        paddingRight: 0,
        paddingLeft: 0,
    },
    countryBox: {
        borderRadius: 12,
        marginRight: 0,
        shadowColor: '#b91c1c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
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
