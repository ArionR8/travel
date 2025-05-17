import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NavDropdown from '../src/components/NavDropdown';
import useNavViewModel from '../src/viewmodels/NavViewModel';

export default function Home() {
    const { dropdownOpen, toggleDropdown, closeDropdown } = useNavViewModel();

    return (
        <SafeAreaView style={styles.container}>
            <NavDropdown
                dropdownOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                closeDropdown={closeDropdown}
            />
            <View style={styles.content}>
                <Text>Welcome to the Travel App!</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    content: {
        marginTop: 30,
        alignItems: 'center',
    },
});
