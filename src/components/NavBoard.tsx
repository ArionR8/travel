// src/components/NavBoard.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';

type NavBoardProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function NavBoard({ navigation }: NavBoardProps) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bani Travell</Text>
            <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.menuButton}>
                <Text style={styles.menuText}>☰ Menu</Text>
            </TouchableOpacity>

            {showMenu && (
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={() => navigation.navigate('Greqi')}>
                        <Text style={styles.dropdownItem}>Greqi Home</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#3498db' },
    title: { flex: 1, fontSize: 20, color: '#fff', fontWeight: 'bold' },
    menuButton: { padding: 10 },
    menuText: { fontSize: 18, color: '#fff' },
    dropdown: { position: 'absolute', top: 50, right: 10, backgroundColor: '#fff', padding: 10, borderRadius: 5 },
    dropdownItem: { fontSize: 16, padding: 5 },
});