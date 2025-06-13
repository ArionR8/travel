import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import Footer from '../components/Footer';
import GreqiImageCard from '../components/GreqiImageCard';
import NavBoard from '../components/NavBoard';
import { RootStackParamList } from '../navigation/types';
import { useGreqiHotels } from '../viewmodels/useGreqiHotel';
import { useGreqiImages } from '../viewmodels/useGreqiImage';

const { width } = Dimensions.get('window');

type GreqiScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Greqi'>;
};

export default function GreqiScreen({ navigation }: GreqiScreenProps) {
    const {
        images,
        loading: imagesLoading,
        error: imagesError,
    } = useGreqiImages();

    const {
        loading: hotelsLoading,
        error: hotelsError,
    } = useGreqiHotels();

    const loading = imagesLoading || hotelsLoading;
    const error = imagesError || hotelsError;

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
            <View style={styles.navbarWrapper}>
                <NavBoard navigation={navigation} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Visit Greece</Text>
                </View>

                <FlatList
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
                    style={styles.flatList}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

                <View style={styles.banner}>
                    <Text style={styles.bannerText}>Qytetet e Greqis - A Piece of Paradise</Text>
                </View>

                <View style={styles.cityBlock}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cityDescription}>
                            Athina është një qytet që bashkon historinë dhe modernitetin. Akropoli dhe Partenoni janë atraksionet kryesore, ndërsa lagjet e vjetra dhe plazhet përreth ofrojnë një përvojë të pasur kulturore dhe natyrore.
                        </Text>
                        <TouchableOpacity style={styles.offerButton}>
                            <Text style={styles.offerButtonText}>Ofertat për Athin</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={{ uri: 'https://expertvagabond.com/wp-content/uploads/things-to-do-athens-guide.jpg' }}
                        style={styles.cityImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.cityBlockReverse}>
                    <Image
                        source={{ uri: 'https://www.discovergreece.com/sites/default/files/styles/og_image/public/2019-12/2-thessaloniki_and_the_white_tower_from_above-1.jpg' }}
                        style={styles.cityImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.cityDescription}>
                            Selaniku, qyteti i dytë më i madh në Greqi, është një nyje e rëndësishme historike, kulturore dhe ekonomike në Ballkan. I njohur për port i madh dhe një qendër aktive për festivale, arsim dhe tregti.
                        </Text>
                        <TouchableOpacity style={styles.offerButton}>
                            <Text style={styles.offerButtonText}>Ofertat për Selaniku</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cityBlock}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cityDescription}>
                            Patra, qyteti i tretë më i madh në Greqi, është një port i rëndësishëm që lidh vendin me Italinë dhe pjesë të tjera të Europës. Qyteti ka edhe monumente historike si Odeoni Antik dhe Kalaja.
                        </Text>
                        <TouchableOpacity style={styles.offerButton}>
                            <Text style={styles.offerButtonText}>Ofertat për Patra</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={{ uri: 'https://v9c9u8s9.delivery.rocketcdn.me/wp-content/uploads/2021/09/Upper-town-Patras-.jpg' }}
                        style={styles.cityImage}
                        resizeMode="cover"
                    />
                </View>
                <Footer />
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
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        letterSpacing: 3,
        textTransform: 'uppercase',
        fontFamily: 'serif',
        textShadowColor: '#999',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    flatList: {
        flexGrow: 0,
        marginBottom: 20,
    },
    banner: {
        backgroundColor: '#2563EB',
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    bannerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cityBlock: {
        flexDirection: 'row',
        marginBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cityBlockReverse: {
        flexDirection: 'row-reverse',
        marginBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        paddingRight: 10,
        maxWidth: '50%',
    },
    cityDescription: {
        color: '#2563EB',
        fontSize: 14,
        marginBottom: 10,
    },
    offerButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    offerButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    cityImage: {
        width: '45%',
        height: 120,
        borderRadius: 10,
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
