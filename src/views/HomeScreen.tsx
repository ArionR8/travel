import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { HomeImage } from '../../assets/images';
import NavBoard from '../components/NavBoard';
import { RootStackParamList } from '../navigation/types';

import CheckItem from '../components/CheckItem';
import PopularCountriesBox from '../components/PopularCountriesBox';
import SpecialOfferBox from '../components/SpecialOfferBox';

type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View style={styles.container}>
            {/* Fixed NavBoard */}
            <View style={styles.navbarWrapper}>
                <NavBoard navigation={navigation} />
            </View>

            {/* Scrollable content including image */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Image source={HomeImage} style={styles.image} />

                {/* Wrap check items and offer boxes with padding container */}
                <View style={styles.contentWrapper}>
                    <View style={styles.checksWrapper}>
                        <CheckItem label="Udhëtime" />
                        <CheckItem label="Bileta" />
                        <CheckItem label="Kroçiere" />
                        <CheckItem label="Paketa Turistike" />
                        <CheckItem label="Shërbime Transferi" />
                        <CheckItem label="Hotele në të gjithë Botën" />
                    </View>

                    <SpecialOfferBox />

                    <View style={{ marginTop: 80 }}>
                        <PopularCountriesBox />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    navbarWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 100,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollContainer: {
        paddingTop: 60, // padding so content doesn't go under navbar
        paddingBottom: 20,
    },
    image: {
        width: width,
        height: height * 0.45,
        resizeMode: 'cover',
        borderRadius: 0,
        marginBottom: 20,
    },
    contentWrapper: {
        paddingHorizontal: 20,
    },
    checksWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
});
