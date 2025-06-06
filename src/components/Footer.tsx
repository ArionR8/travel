import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.footerContainer}>
            <View style={styles.infoSection}>
                <Text style={styles.companyName}>TravelApp</Text>
                <Text style={styles.address}>Rr. Dëshmorët e Kombit, Prishtinë, Kosovë</Text>
                <Text style={styles.email}>info@travelapp.com</Text>
            </View>

            <View style={styles.linksSection}>
                <TouchableOpacity onPress={() => Linking.openURL('https://example.com/terms')}>
                    <Text style={styles.link}>Kushtet e Përdorimit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://example.com/privacy')}>
                    <Text style={styles.link}>Politika e Privatësisë</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.copyRightSection}>
                <Text style={styles.copyRightText}>© {new Date().getFullYear()} TravelApp. Të gjitha të drejtat e rezervuara.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#2c3e50',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginTop: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    infoSection: {
        marginBottom: 15,
        alignItems: 'center',
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ecf0f1',
        marginBottom: 5,
    },
    address: {
        fontSize: 14,
        color: '#bdc3c7',
        textAlign: 'center',
    },
    email: {
        fontSize: 14,
        color: '#bdc3c7',
        textAlign: 'center',
    },
    linksSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    link: {
        fontSize: 14,
        color: '#3498db',
        textDecorationLine: 'underline',
    },
    copyRightSection: {
        alignItems: 'center',
        marginTop: 10,
    },
    copyRightText: {
        fontSize: 12,
        color: '#7f8c8d',
    },
});
