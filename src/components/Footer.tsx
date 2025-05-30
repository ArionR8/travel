import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { subscribeEmail } from '../services/SubscriptionService';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async () => {
        if (!email.trim()) {
            Alert.alert('Ju lutem shkruani email');
            return;
        }
        try {
            await subscribeEmail(email);
            setMessage('Jeni abonuar me sukses! Në email do të njoftoheni për ofertat më të mira.');
            setEmail('');
        } catch (error) {
            setMessage('Ndodhi një gabim. Ju lutem provoni përsëri.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.statsContainer}>
                <View style={styles.firstRow}>
                    <View style={styles.statItem}>
                        <FontAwesome name="check-circle" size={25} color="green" />
                        <Text style={styles.statText}>Call Center</Text>
                    </View>
                    <View style={styles.statItem}>
                        <FontAwesome name="check-circle" size={25} color="green" />
                        <Text style={styles.statText}>+25 Vite Eksperiencë</Text>
                    </View>
                </View>
                <View style={styles.statItem}>
                    <FontAwesome name="check-circle" size={25} color="green" />
                    <Text style={styles.statText}>+200,000 Turistë Vjetorë</Text>
                </View>
            </View>
            <View style={styles.subscriptionContainer}>
                <Text style={styles.subscriptionText}>
                    Regjistrohu tani! Ne do të dërgojmë ofertat më të mira çdo javë.
                </Text>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
                        <Text style={styles.subscribeButtonText}>Abonohu</Text>
                    </TouchableOpacity>
                </View>
                {!!message && <Text style={styles.messageText}>{message}</Text>}
            </View>

            <ScrollView horizontal={false} style={styles.footerInfoContainer}>
                <View style={styles.footerRow}>
                    {/* Left side: Informacion i rëndësishëm */}
                    <View style={styles.infoColumnLeft}>
                        <Text style={styles.infoHeader}>Informacion i rëndësishëm</Text>
                        {[
                            'Këshilla për udhëtim',
                            'Rregullat e Udhëtimit',
                            'Rreth nesh',
                            'Politika e Cookies',
                            'Ndrysho cilësimet e Cookies',
                        ].map((item) => (
                            <Text key={item} style={styles.infoItem}>{item}</Text>
                        ))}
                    </View>

                    {/* Right side: Rezervimet + Bani Travel | Kosova */}
                    <View style={styles.infoColumnRight}>
                        <View>
                            <Text style={styles.infoHeader}>Rezervimet</Text>
                            {['Client Care', 'B2B Login'].map((item) => (
                                <Text key={item} style={styles.infoItem}>{item}</Text>
                            ))}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.infoHeader}>Bani Travel | Kosova</Text>
                            {['Call Center: +383 45 963 828', 'info@Bani-travel.com'].map((item) => (
                                <Text key={item} style={styles.infoItem}>{item}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0f2ff',
        padding: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 12,
    },
    statText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    subscriptionContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    subscriptionText: {
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 10,
    },
    subscribeButton: {
        backgroundColor: '#ff7a00',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    subscribeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    messageText: {
        marginTop: 12,
        color: 'green',
        textAlign: 'center',
    },
    footerInfoContainer: {
        // no special styles here
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoColumnLeft: {
        flex: 1,
        marginRight: 20,
    },
    infoColumnRight: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    infoHeader: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 8,
    },
    infoItem: {
        fontSize: 14,
        marginBottom: 4,
    },
});
