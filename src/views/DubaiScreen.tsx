import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import DubaiTable from '../components/DubaiTable';
import Footer from '../components/Footer';
import NavBoard from '../components/NavBoard';
import Subscription from '../components/SubscriptionForm';
import { RootStackParamList } from '../navigation/types';
import { useDubaiPrices } from '../viewmodels/useDubaiPrice';

const { width } = Dimensions.get('window');

type DubaiScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Dubai'>;
};

export default function DubaiScreen({ navigation }: DubaiScreenProps) {
    const { prices, loading, error } = useDubaiPrices();

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

            <ScrollView contentContainerStyle={styles.scrollWrapper}>
                {/* Title */}
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Pushime në Abu Dhabi dhe Dubai</Text>
                </View>

                {/* Images Section */}
                <View style={styles.imagesRow}>
                    {/* Main Large Image */}
                    <View style={styles.mainImageWrapper}>
                        <Image
                            source={{ uri: 'https://media.cnn.com/api/v1/images/stellar/prod/181218135609-dubai-beach-pexels.jpg?q=w_1600,h_900,x_0,y_0,c_fill' }}
                            style={styles.mainImage}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Two Small Images stacked vertically */}
                    <View style={styles.smallImagesWrapper}>
                        <Image
                            source={{ uri: 'https://as2.ftcdn.net/v2/jpg/03/81/67/75/1000_F_381677568_eZaX7u05HIszMcZTTJbfCk0tFoizziFU.jpg' }}
                            style={styles.smallImage}
                            resizeMode="cover"
                        />
                        <Image
                            source={{ uri: 'https://www.savoredjourneys.com/wp-content/uploads/2015/08/abu-dhabi-city-guide-feature.jpg' }}
                            style={styles.smallImage}
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Prices Table */}
                <View style={styles.tableWrapper}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerCell}>Nisja</Text>
                        <Text style={styles.headerCell}>Tipi</Text>
                        <Text style={styles.headerCell}>Çmimi</Text>
                    </View>
                    {prices.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.cell}>{item.nisja}</Text>
                            <Text style={styles.cell}>{item.tipi_dhomes}</Text>
                            <Text style={styles.cell}>{item.cmimi}€</Text>
                        </View>
                    ))}
                </View>

                <DubaiTable
                    perfshihet={[
                        'Bileta e aeroplanit',
                        'Transferi nga Aeroporti në Hotelet dhe anasjelltas',
                        'Akomodimi në Hotel në Abu Dhabi dhe Dubai',
                        'Mëngjeset në Hotel',
                        'Shëtitjet me Autobus sipas Programit',
                        'Shoqërues në shqip gjatë gjithë udhëtimit',
                        'Guida vendase në disa Shëtitje',
                        'Vetëm 1 çantë shpine',
                    ]}
                    nukPerfshihet={[
                        'Xhiro me Anije Catamaran në Dubai Marina me transfertë - €42',
                        'Darke 4 Set menu + 1 pije me Pamje nga Shfaqja me Shatervani - €60',
                        'Ngjitje në Ndërtesën më të lartë Burj Khalifa me transfertë- €68',
                        'Biletë hyrje tek Dubai Frame ose Miracle Garden me transfertë - €47',
                        'Shëtitje dhe Darkë Safari në Shkretëtirë me transfertë- €60',
                    ]}
                />

                <View style={{ marginTop: 30 }}>
                    <Subscription />
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
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    imagesRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 10,
        marginBottom: 20,
    },
    mainImageWrapper: {
        flex: 1,
    },
    mainImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 12,
    },
    smallImagesWrapper: {
        justifyContent: 'space-between',
    },
    smallImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginBottom: 10,
    },
    tableWrapper: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 8,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        color: '#2563EB',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: '#333',
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
