import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { HomeImage } from '../../assets/images';
import CheckItem from '../components/CheckItem';
import Footer from '../components/Footer';
import NavBoard from '../components/NavBoard';
import PopularCountriesBox from '../components/PopularCountriesBox';
import SpecialOfferBox from '../components/SpecialOfferBox';
import Subscription from '../components/SubscriptionForm';
import { RootStackParamList } from '../navigation/types';

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

            {/* Scrollable content */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section with Overlay */}
                <View style={styles.heroSection}>
                    <Image source={HomeImage} style={styles.image} />
                    <View style={styles.heroOverlay}>
                        <View style={styles.heroContent}>
                            <Text style={styles.heroTitle}>Zbuloni Botën</Text>
                            <Text style={styles.heroSubtitle}>
                                Krijojmë përvojat më të bukura të udhëtimit për ju
                            </Text>
                            <View style={styles.heroStats}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>50+</Text>
                                    <Text style={styles.statLabel}>Destinacione</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>1000+</Text>
                                    <Text style={styles.statLabel}>Klientë të Kënaqur</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>24/7</Text>
                                    <Text style={styles.statLabel}>Mbështetje</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Main content */}
                <View style={styles.contentWrapper}>
                    {/* Services Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Shërbimet Tona</Text>
                        <Text style={styles.sectionSubtitle}>
                            Gjithçka që ju nevojitet për udhëtimin tuaj të përsosur
                        </Text>
                        <View style={styles.checksWrapper}>
                            <CheckItem label="Udhëtime" />
                            <CheckItem label="Bileta" />
                            <CheckItem label="Kroçiere" />

                            {/* Wrap these two in a horizontal View */}
                            <View style={[styles.rowInline, { marginBottom: 20 }]}>
                                <CheckItem label="Paketa Turistike" />
                                <CheckItem label="Shërbime Transferi" />
                            </View>

                            <CheckItem label="Hotele në të gjithë Botën" />
                        </View>
                    </View>

                    {/* Special Offers Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Ofertat Speciale</Text>
                        <Text style={styles.sectionSubtitle}>
                            Mos i humbisni këto oferta të jashtëzakonshme
                        </Text>
                        <SpecialOfferBox />
                    </View>

                    {/* Popular Destinations Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Destinacionet Më Popullore</Text>
                        <Text style={styles.sectionSubtitle}>
                            Zgjidhni nga destinacionet më të preferuara të udhëtarëve
                        </Text>
                        <PopularCountriesBox />
                    </View>

                    {/* Why Choose Us Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Pse Na Zgjidhni Ne?</Text>
                        <View style={styles.featuresGrid}>
                            <View style={styles.featureCard}>
                                <View style={styles.featureIcon}>
                                    <Text style={styles.featureEmoji}>✈️</Text>
                                </View>
                                <Text style={styles.featureTitle}>Eksperiencë e Gjatë</Text>
                                <Text style={styles.featureDescription}>
                                    Mbi 10 vjet përvojë në industrinë e turizmit
                                </Text>
                            </View>
                            <View style={styles.featureCard}>
                                <View style={styles.featureIcon}>
                                    <Text style={styles.featureEmoji}>💰</Text>
                                </View>
                                <Text style={styles.featureTitle}>Çmime Konkurruese</Text>
                                <Text style={styles.featureDescription}>
                                    Ofrojmë çmimet më të mira në treg
                                </Text>
                            </View>
                            <View style={styles.featureCard}>
                                <View style={styles.featureIcon}>
                                    <Text style={styles.featureEmoji}>🛡️</Text>
                                </View>
                                <Text style={styles.featureTitle}>Siguri e Garantuar</Text>
                                <Text style={styles.featureDescription}>
                                    Udhëtimet tuaja janë të sigurta me ne
                                </Text>
                            </View>
                            <View style={styles.featureCard}>
                                <View style={styles.featureIcon}>
                                    <Text style={styles.featureEmoji}>📞</Text>
                                </View>
                                <Text style={styles.featureTitle}>Mbështetje 24/7</Text>
                                <Text style={styles.featureDescription}>
                                    Jemi këtu për ju në çdo moment
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Subscription />

                <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    navbarWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.95)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    scrollContainer: {
        paddingTop: 60, // offset for fixed navbar
        paddingBottom: 30,
    },

    // Hero Section Styles
    heroSection: {
        position: 'relative',
        marginBottom: 30,
    },
    image: {
        width: width,
        height: height * 0.5,
        resizeMode: 'cover',
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    heroContent: {
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 25,
        opacity: 0.9,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    heroStats: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    statLabel: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.9,
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 10,
    },

    // Content Sections
    contentWrapper: {
        paddingHorizontal: 20,
    },
    sectionContainer: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    checksWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },

    // Features Grid
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    featureCard: {
        width: (width - 55) / 2, // 2 cards per row with margins
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'rgba(52, 152, 219, 0.1)',
    },
    featureIcon: {
        width: 60,
        height: 60,
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    featureEmoji: {
        fontSize: 28,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 8,
    },
    featureDescription: {
        fontSize: 13,
        color: '#7f8c8d',
        textAlign: 'center',
        lineHeight: 18,
    },

    // Call to Action Section
    ctaSection: {
        marginBottom: 20,
    },
    ctaContainer: {
        backgroundColor: '#3498db',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#3498db',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    ctaTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    ctaSubtitle: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        opacity: 0.9,
        marginBottom: 25,
        lineHeight: 22,
    },
    ctaButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#fff',
    },
    ctaButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    rowInline: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        flexWrap: 'nowrap',
    }
});