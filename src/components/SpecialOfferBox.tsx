import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { height } = Dimensions.get('window');
const NAVBAR_HEIGHT = 250;

export default function SpecialOfferBox() {
    return (
        <View style={[styles.container, { height: height - NAVBAR_HEIGHT }]}>
            <Text style={styles.title}>Oferta Speciale</Text>
            <View style={styles.offerBox}>
                {/* Future special offer content goes here */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        // No marginTop here!
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 12,
    },
    offerBox: {
        flex: 1,
        backgroundColor: '#dc2626',
        borderRadius: 12,
        shadowColor: '#b91c1c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
});
